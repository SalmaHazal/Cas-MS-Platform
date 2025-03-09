import { Component } from '@angular/core';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpComponent } from "./components/sign-up/sign-up.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HomePageComponent, SignUpComponent],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
