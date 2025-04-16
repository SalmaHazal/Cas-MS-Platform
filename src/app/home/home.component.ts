import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CurrentProjectComponent } from '../current-project/current-project.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CurrentProjectComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
      
  }

}
