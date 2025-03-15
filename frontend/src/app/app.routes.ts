import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CurrentProjectComponent } from './components/current-project/current-project.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CurrentProjectComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
];
