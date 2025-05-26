import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service/user.service';
import { AuthService } from '../../services/auth-service/auth.service';

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
export class SidebarComponent implements OnInit {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  sMenuOpen = false;
  user: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.fetchUserDetails().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User profile updated:', user);
      },
      error: (err) => {
        console.error('Error fetching user profile:', err);
      },
    });
  }

  toggleMenu() {
    this.sMenuOpen = !this.sMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  menuItems: MenuItem[] = [
    {
      icon: 'fas fa-home',
      label: 'Dashboard',
      isOpen: false,
      path: '/app/dashboard',
    },

    {
      icon: 'fas fa-envelope',
      label: 'Messages',
      path: '/app/chat',
    },
    {
      icon: 'fas fa-calendar',
      label: 'Calendar',
      path: '/app/calendar',
    },
    {
      icon: 'fas fa-tasks',
      label: 'Projects',
      path: '/app/projects',
    },
    {
      icon: 'fas fa-file',
      label: 'Documentation',
      path: '/app/documentation',
    },
    {
      icon: 'fas fa-cog',
      label: 'Settings',
      isOpen: false,
      path: '/app/dashboard',
      children: [
        { icon: 'fas fa-user', label: 'Profile' },
        { icon: 'fas fa-lock', label: 'Security' },
      ],
    },
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
}
