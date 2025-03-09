import { Component } from '@angular/core';
import { CurrentProjectComponent } from "../current-project/current-project.component";

@Component({
  selector: 'app-home-page',
  imports: [CurrentProjectComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
