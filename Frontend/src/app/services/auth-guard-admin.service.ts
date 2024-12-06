import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardAdminService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpired() && this.authService.getUserRole() === 'admin') {
      // User is authenticated and token is valid
      return true;
    } else {
      // User is not authenticated or token is expired
      // Redirect to login page or any other appropriate page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
