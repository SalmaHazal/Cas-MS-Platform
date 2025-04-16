import { Component, ViewChild, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { DayPilot, DayPilotModule, DayPilotSchedulerComponent } from 'daypilot-pro-angular';
import { DataService, ExtendedEventData } from './data.service';
import ExcelJS from 'exceljs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'scheduler-component',
  standalone: true,
  styles: [`
    ::ng-deep .scheduler_default_mainheader {
      background-color: #FFF1D5 !important;  /* Main header background */
      color: #000 !important;
      font-weight: bold;
      font-size: 14px;
    }
    
    ::ng-deep .custom-cell {
      background-color: #FFE5B4 !important;  /* Day cells */
      border-right: 1px solid #facc15 !important;
      color: #333 !important;
      text-align: center;
    }
    
    ::ng-deep .scheduler_default_rowheader {
      background-color: #FFF1D5 !important;
    }
    
    ::ng-deep .scheduler_default_corner {
      background-color: #FFF1D5 !important;
    
    }
      ::ng-deep .main-header-month {
  background-color: #FFF1D5 !important;
  font-weight: bold;
  font-size: 13px;
  color: #111;
  border-bottom: 1px solid #facc15;
}

::ng-deep .main-header-day {
  background-color: #FFF1D5  !important;
  font-size: 14px;
  color: #333;
}
      
    `],
  imports: [DayPilotModule, FormsModule, CommonModule],
  providers: [DataService],
  template: `
    <div class="mb-4 flex items-center gap-2 p-4  rounded-box shadow z-10" style="background-color: #FFDDAE;">
      <input class="input input-bordered w-60 bg-white text-black" type="text" placeholder="Filename" [(ngModel)]="filename" />
      <button class="btn btn-neutral border-gray-300 bg-white text-black" (click)="exportToExcel()">Export</button>
      <button (click)="openDialog()" class="btn btn-wide ml-auto bg-white text-black border border-gray-300 hover:bg-gray-100" style="background-color: #FBFBFB;" *ngIf="authenticationService.roles.includes('ADMIN')" (click)="addNewActivity()">Add Activity</button>
      
    </div>

    <div #schedulerWrapper class="relative">
      <daypilot-scheduler
        class="rounded-xl shadow-md border-base-300 bg-base-100"
        [config]="config"
        [events]="events"
        #scheduler>
      </daypilot-scheduler>

      <div *ngIf="contextMenu.visible" class="dropdown dropdown-open absolute z-50"
           [ngStyle]="{'top.px': contextMenu.y, 'left.px': contextMenu.x}">
        <ul class="menu bg-base-100 rounded-box w-40 shadow">
          <li><a *ngIf="authenticationService.roles.includes('ADMIN')" (click)="editEvent(contextMenu.event)">✏️ Edit</a></li>
          <li><a class="text-error"  *ngIf="authenticationService.roles.includes('ADMIN')" (click)="deleteEvent(contextMenu.event)">🗑️ Delete</a></li>
          <li><a  (click)="showEventDescription(contextMenu.event.description)">💬 Show Desc</a></li>
          <li><a  (click)="editEvent(contextMenu.event)">💬 Reserver</a></li>
        </ul>
      </div>
    </div>
     
    <dialog #activityDialog class="modal" *ngIf="authenticationService.roles.includes('ADMIN')">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-2">Add New Activity</h3>

        <input [(ngModel)]="newActivityData.text" class="input input-bordered w-full mb-2" placeholder="Activity Name" />
        <label class="label">Choose a color:</label>
       
        <div class="modal-action">
          <button class="btn btn-success" (click)="addNewActivity()">Create</button>
          <button class="btn btn-ghost" (click)="cancelActivity()">Cancel</button>
        </div>
      </div>
    </dialog>

    <dialog #eventDialog class="modal" *ngIf="authenticationService.roles.includes('ADMIN')">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-2">Create a New Event</h3>

        <input [(ngModel)]="newEventData.text" class="input input-bordered w-full mb-2" placeholder="Event title" />

        <textarea [(ngModel)]="newEventData.description" class="textarea textarea-bordered w-full mb-2" placeholder="Event description"></textarea>

        <label class="label">Choose a color:</label>
        <input [(ngModel)]="newEventData.color" type="color" class="input w-20 h-10 p-0 border-0 cursor-pointer mb-4" />

        <div class="modal-action">
          <button class="btn btn-success" (click)="confirmEvent()">Create</button>
          <button class="btn btn-ghost" (click)="cancelEvent()">Cancel</button>
        </div>
      </div>
    </dialog>

  `
})
export class SchedulerComponent implements AfterViewInit, OnInit {

  filename: string = "scheduler.xlsx";
  @ViewChild('scheduler', { static: true }) scheduler!: DayPilotSchedulerComponent;
  @ViewChild('schedulerWrapper', { static: true }) schedulerWrapper!: ElementRef;
  @ViewChild('eventDialog') eventDialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('activityDialog') activityDialog!: ElementRef<HTMLDialogElement>;

  events: DayPilot.EventData[] = [];

  newEventData = {
    start: null as any,
    end: null as any,
    resource: null as any,
    text: '',
    description: '',
    color: '#60a5fa'
  };

  newActivityData = {
    
    text: ''
    
  };

  contextMenu = {
    visible: false,
    x: 0,
    y: 0,
    event: null as any
  };

  constructor(private ds: DataService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    window.addEventListener('click', () => {
      if (this.contextMenu.visible) {
        this.contextMenu.visible = false;
      }
    });
  }

  ngAfterViewInit(): void {
  this.ds.getResources().subscribe(result => this.config.resources = result);

  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const dpStartOfMonth = new DayPilot.Date(startOfMonth);
  this.scheduler.control.scrollTo(dpStartOfMonth);

  const from = this.scheduler.control.visibleStart();
  const to = this.scheduler.control.visibleEnd();

  // Load events from backend
  this.ds.getEvents(from, to).subscribe(result => {
    this.events = result;
    

    // 👉 Optionally add static events for testing
    const testEvents = [
      {
        id: DayPilot.guid(),
        text: "Planning Meeting",
        start: "2025-04-15T10:00:00",
        end: "2025-04-15T12:00:00",
        resource: "R100",
        description: "Discuss Q2 planning",
        color: "#34d399"
      },
      {
        id: DayPilot.guid(),
        text: "Design Review",
        start: "2025-04-16T14:00:00",
        end: "2025-04-16T15:30:00",
        resource: "R101",
        description: "UI/UX updates",
        color: "#60a5fa"
      }
    ];

    // Add each test event to the scheduler and send to DB
    for (const ev of testEvents) {
      this.scheduler.control.events.add(ev);
      this.ds.createEvent(ev).subscribe();  // save to DB
    }
  });
}


  config: DayPilot.SchedulerConfig = {
    timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
    scale: "Day",
    days: 365,
    startDate: "2025-01-01",
    durationBarVisible: true,
    treeEnabled: true,
    exceljs: ExcelJS,
    
    onBeforeTimeHeaderRender: (args) => {
      if (args.header.level === 0) {
        args.header.cssClass = "main-header-month";
      }
      if (args.header.level === 1) {
        args.header.cssClass = "main-header-day";
      }
    },
    
    onTimeRangeSelected: (args) => {
      this.newEventData = {
        start: args.start,
        end: args.end,
        resource: args.resource,
        text: '',
        description: '',
        color: '#60a5fa'
      };
      this.eventDialog.nativeElement.showModal();
    },

    onEventRightClick: (args) => {
      args.preventDefault();
      const wrapperRect = this.schedulerWrapper.nativeElement.getBoundingClientRect();
      this.contextMenu = {
        visible: true,
        x: args.originalEvent.clientX - wrapperRect.left,
        y: args.originalEvent.clientY - wrapperRect.top,
        event: args.e.data
      };
    },

    onBeforeRowHeaderRender: args => {
      if (args.row.id === "summary") {
        args.row.backColor = "#cadffb";
      }
    },

    onBeforeCellRender: args => {
      if (args.cell.resource === "summary") {
        const total = args.control.events.forRange(args.cell.start, args.cell.end);
        args.cell.properties.text = total.length > 0 ? `${total.length}` : "";
        args.cell.properties.verticalAlignment = "center";
        args.cell.properties.horizontalAlignment = "center";
        args.cell.properties.backColor = "#d5e2fa";
        args.cell.properties.cssClass = "custom-cell";
      }
    },

    onBeforeEventRender: args => {
      const data = <ExtendedEventData>args.data;
      args.data.backColor = data.color || "#60a5fa";
      args.data.borderColor = data.color || "#60a5fa";
      args.data.fontColor = "#ffffff";
      args.data.toolTip = `${data.text}\n${data['description'] || ''}`;

      args.data.cssClass = "cursor-pointer rounded-md px-1";
    }
  };

  confirmEvent() {
    const { start, end, resource, text, description, color } = this.newEventData;
  
    const startStr = new Date(start).toISOString();
    const endStr = new Date(end).toISOString();   
    const newEvent = {
      start: startStr,
      end: endStr,
      resource,
      text,
      id: DayPilot.guid(),
      description,
      color
    };
    
    this.scheduler.control.events.add(newEvent);
    this.ds.createEvent(newEvent).subscribe();
    this.eventDialog.nativeElement.close();
  }
  
  cancelActivity() {
    this.activityDialog.nativeElement.close();
  }
  cancelEvent() {
    this.eventDialog.nativeElement.close();
  }

  editEvent(event: any) {
    this.contextMenu.visible = false;
    DayPilot.Modal.prompt("Update event text:", event.text).then(modal => {
      if (!modal.canceled) {
        event.text = modal.result;
        this.scheduler.control.events.update(event);
        this.ds.updateEvent(event).subscribe();
      }
    });
  }

  deleteEvent(event: any) {
    this.contextMenu.visible = false;
    this.scheduler.control.events.remove(event);
    this.ds.deleteEvent(event.id).subscribe();
  }
  
  showEventDescription(description: string) {
    // If there is a description, show it in an alert (you can customize this later)
    if (description && description.trim() !== '') {
      alert(`Event Description:\n${description}`);
    } else {
      alert('This event has no description.');
    }
  }
  openDialog() {
    const dialog = this.activityDialog.nativeElement;  // Access the native DOM element
    dialog.showModal();  // Open the dialog
  }

  addNewActivity() {
    const generateRandomId = (): string => {
      return 'ACT-' + Math.floor(10000 + Math.random() * 90000).toString();
    };
  
    const newId = generateRandomId();
    const newChildren = [
      { name: 'Design Cell', id: 'R100', capacity: 25 },
      { name: ' Sponsoring Cell', id: 'R101', capacity: 25 },
      { name: ' Media Cell', id: 'R102', capacity: 25 },
      { name: ' Logistic Cell', id: 'R103', capacity: 25 },
      { name: ' Redaction Cell', id: 'R104', capacity: 25 },

    ];
    this.ds.addResource(this.newActivityData.text, newId, newChildren).subscribe();
  }

  exportToExcel(): void {
    const options = { area: "full" };
    this.scheduler.control.exportAs("xlsx", options).download(this.filename || "scheduler.xlsx");
  }
}
