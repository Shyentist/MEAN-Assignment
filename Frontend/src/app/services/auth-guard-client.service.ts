import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardClientService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated() && !this.authService.isTokenExpired()) {
      // User is authenticated and token is valid
      // Even if it is called 'Client', this is just the minimum requirement, admin users can access as well
      // So we only care that the user is authenticated
      return true;
    } else {
      // User is not authenticated or token is expired
      // Redirect to login page or any other appropriate page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
