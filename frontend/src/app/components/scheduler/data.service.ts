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
      name: "Utilization", id: "summary", frozen: "top", cellsAutoUpdated: true
    },
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
  private baseUrl = 'http://localhost:8021/events';
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
    return this.http.get<any[]>(url).pipe(
      tap(response => {
        console.log('HTTP Response:', response);  // This will log the content of the HTTP response to the console
      })
    );
  }
  
  

  
  /*getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }*/

  getResources(): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.resources);
      }, 200);
    });

    // return this.http.get("/api/resources");
  }


  createEvent(event: any): Observable<any> {
    return this.http.post('http://localhost:8021/events', event).pipe(
      tap(response => {
        console.log('POST Response:', response); // log backend response
      },
      error => {
        console.error('POST Error:', error); // log any error like 400
      })
    );
  }
  
  
  updateEvent(event: any): Observable<any> {
    return this.http.put(`/api/events/${event.id}`, event);
  }
  
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`/api/events/${id}`);
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
    return this.http.post('http://localhost:8021/addActivity', newResource).pipe(
      tap({
        next: response => {
          console.log('POST Response:', response);
        },
        error: error => {
          console.error('POST Error:', error);
        }
      })
    );
  }
  
}
export interface ExtendedEventData extends DayPilot.EventData {
  color: string;
}