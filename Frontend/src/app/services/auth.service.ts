import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';

  constructor() {}

  isAuthenticated(): boolean {
    const authToken = this.getAuthToken();
    return authToken !== null;
  }

  isTokenExpired(): boolean {
    const authToken = this.getAuthToken();
    if (authToken) {
      const tokenExpiration = this.getTokenExpiration(authToken);
      const currentTime = new Date().getTime() / 1000;
      return tokenExpiration < currentTime;
    }
    return true;
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  removeAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  getUserRole(): string | null {
    const authToken = this.getAuthToken();
    if (authToken) {
      const decodedToken: any = jwt_decode(authToken);
      if (decodedToken && decodedToken.role) {
        return decodedToken.role;
      }
    }
    return null;
  }

  private getTokenExpiration(token: string): number {
    const decodedToken: any = jwt_decode(token);
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp;
    }
    return 0;
  }
}
