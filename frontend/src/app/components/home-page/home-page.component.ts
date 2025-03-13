import { Component } from '@angular/core';
import { CurrentProjectComponent } from "../current-project/current-project.component";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  imports: [CurrentProjectComponent,  NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
