import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SchedulerComponent } from '../scheduler/scheduler.component';
import { NavbarComponent } from '../navbar/navbar.component';
//import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-calendar',
  imports: [SchedulerComponent ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarComponent implements OnInit {

  //constructor(private authentication: AuthenticationService){}
  ngOnInit(): void {
      
  }
  logout(){
    //this.authentication.logout();
  }
}

