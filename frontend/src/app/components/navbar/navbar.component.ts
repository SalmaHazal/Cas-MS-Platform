import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  sMenuOpen = false;
 
  constructor(public authenticationService: AuthenticationService){}
  toggleMenu() {
    this.sMenuOpen = !this.sMenuOpen;
  }
  
  ngOnInit(): void {
      
  }
  
}
