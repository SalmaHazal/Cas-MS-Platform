import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  user: any;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToProfile(): void {
    this.router.navigate(['/app/profile']);
    this.isMenuOpen = false;
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
