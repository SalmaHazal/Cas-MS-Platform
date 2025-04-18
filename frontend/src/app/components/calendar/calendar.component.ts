import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SchedulerComponent } from '../scheduler/scheduler.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-calendar',
  imports: [SchedulerComponent ,NavbarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarComponent implements OnInit {

  constructor(){}
  ngOnInit(): void {
    
    
  }
}

