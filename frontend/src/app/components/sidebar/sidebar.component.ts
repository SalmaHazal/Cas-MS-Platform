import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
//import { AuthenticationService } from '../services/authentication.service';

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  path?: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, RouterLink],
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit{
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

    sMenuOpen = false;
   
   //constructor(public authenticationService: AuthenticationService){}
    toggleMenu() {
      this.sMenuOpen = !this.sMenuOpen;
    }
    
    ngOnInit(): void {
        
    }
    logout(){
      //this.authenticationService.logout()
    }

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      isOpen: false,
      path: "/app/dashboard",
      
    },
    
    {
      icon: 'fas fa-envelope',
      label: 'Messages',
      path: "/app/chat",
    },
    {
      icon: 'fas fa-calendar',
      label: 'Calendar',
      path: "/app/calendar",
    },
    {
      icon: 'fas fa-tasks',
      label: 'Projects',
      path: "/app/projects",
    },
    {
      icon: 'fas fa-file',
      label: 'Documentation',
      path: "/app/documentation",
    },
    {
      icon: 'fas fa-cog',
      label: 'Settings',
      isOpen: false,
      path: "/app/dashboard",
      children: [
        { icon: 'fas fa-user', label: 'Profile' },
        { icon: 'fas fa-lock', label: 'Security' },
      ]
    },
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}