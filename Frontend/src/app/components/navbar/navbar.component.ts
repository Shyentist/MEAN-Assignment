import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  isLoggedIn: boolean;
  isLoggedInAsAdmin: boolean;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isAuthenticated() && !this.authService.isTokenExpired();
    this.isLoggedInAsAdmin = this.authService.isAuthenticated() && !this.authService.isTokenExpired() && this.authService.getUserRole() === 'admin';
  }

  logout(): void {
    this.authService.removeAuthToken();
  }
}
