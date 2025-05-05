import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import {Injectable} from '@angular/core';
import {DayPilot} from 'daypilot-pro-angular';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class DataService {

  resources: DayPilot.ResourceData[] = [
   
    {
      name: 'Group A', id: 'GA', expanded: true, children: [
        {name: 'Resource 1', id: 'R1', capacity: 10},
        {name: 'Resource 2', id: 'R2', capacity: 30},
        {name: 'Resource 3', id: 'R3', capacity: 20},
        {name: 'Resource 4', id: 'R4', capacity: 40}
      ]
    },
    {
      name: 'Group B', id: 'GB', expanded: true, children: [
        {name: 'Resource 5', id: 'R5', capacity: 20},
        {name: 'Resource 6', id: 'R6', capacity: 40},
        {name: 'Resource 7', id: 'R7', capacity: 20},
        {name: 'Resource 8', id: 'R8', capacity: 40}
      ]
    }
  ];
  private baseUrl = 'http://localhost:8082/events';
  private activityUrl = 'http://localhost:8082/allActivities';
  events: DayPilot.EventData[] = [
    {
      id: '1',
      resource: 'R1',
      start: '2025-10-03',
      end: '2025-10-08',
      text: 'Scheduler Event 1',
      barColor: '#e69138'
    },
    {
      id: '2',
      resource: 'R3',
      start: '2025-10-02',
      end: '2025-10-05',
      text: 'Scheduler Event 2',
      barColor: '#6aa84f'
    },
    {
      id: '3',
      resource: 'R3',
      start: '2025-10-06',
      end: '2025-10-09',
      text: 'Scheduler Event 3',
      barColor: '#3c78d8'
    }
  ];

  constructor(private http: HttpClient) {
  }
   
  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    const url = `${this.baseUrl}?from=${from.toString()}&to=${to.toString()}`;
    return this.http.get<any[]>(url);
  }
  
  

  
 

  getResources(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8082/allActivities').pipe(
      tap(data => console.log("✅ Actual resource data fetched:", data))
    );
  }
  


  createEvent(event: any): Observable<any> {
    return this.http.post('http://localhost:8082/events', event);
  }
  
  
  updateEvent(event: any): Observable<any> {
    return this.http.put(`/api/events/${event.id}`, event);
  }
  
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8082/events/${id}`);
  }
  // Add a new resource to the resources array

  addResource(name: string, id: string, children: { name: string, id: string, capacity: number }[]) {

    const newResource: DayPilot.ResourceData = {
      name: name,
      id: id,
      //expanded: true,
      children: children
    };
   
    // Add the new resource to the resources array first
    this.resources.push(newResource);
    
  
    // Then send the POST request to the backend
    return this.http.post('http://localhost:8082/addActivity', newResource);
  }
  
}
export interface ExtendedEventData extends DayPilot.EventData {
  color: string;
}