import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf, *ngFor
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  standalone: true, // ✅ Needed because you're not using a module
  imports: [CommonModule,  NavbarComponent], // ✅ Add CommonModule here
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  customer: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get("http://localhost:8021/students").subscribe(
      data => {
        this.customer = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}
