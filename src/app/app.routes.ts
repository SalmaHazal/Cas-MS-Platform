import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProjectsComponent } from './projects/projects.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';


export const routes: Routes = [

    //{path:'', component: LoginComponent},
    {path:'', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignUpComponent},
    {path:'calendar', component: CalendarComponent },
    {path:'projects', component: ProjectsComponent },
    { path: 'admin', component: NavbarComponent, canActivate: [AuthGuard], children : [
        {path:'dashboard', component: DashboardComponent , canActivate: [AuthorizationGuard], data:{roles : ["ADMIN"]}},
    ]},
];
