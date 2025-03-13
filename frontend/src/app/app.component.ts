import { Component } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HomePageComponent],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
