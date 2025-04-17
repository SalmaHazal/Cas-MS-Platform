import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrentProjectComponent } from '../current-project/current-project.component';

@Component({
  selector: 'app-home',
  imports: [CurrentProjectComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
      
  }

}
