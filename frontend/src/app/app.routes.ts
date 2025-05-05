import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
//import { ProjectsComponent } from './components/projects/projects.component';
import { LoginComponent } from './components/login/login.component';
//import { AuthGuard } from './components/guards/auth.guard';
//import { AuthorizationGuard } from './components/guards/authorization.guard';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './components/admin/admin.component';


export const routes: Routes = [

    //{path:'', component: LoginComponent},
    {path:'', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignUpComponent},
    //{path:'calendar', component: CalendarComponent },
    
    /*{ path: 'admin', component: NavbarComponent, canActivate: [AuthGuard], children : [
        {path:'dashboard', component: DashboardComponent , canActivate: [AuthorizationGuard], data:{roles : ["ADMIN"]}},
    ]},*/

    { path: 'app', component:AdminComponent, children : [
        {path:'dashboard', component: DashboardComponent },
        {path:'calendar', component: CalendarComponent },
        //{path:'projects', component: ProjectsComponent },
    ]},
];
