import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  public loginFailed: boolean = false;
  public errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  login(email: string, pw: string) {
  
    // HTTP POST request to login endpoint
    this.http.post('http://localhost:4000/login', { email, pw })
      .subscribe((response: any) => {
        // Handle token
        const authToken = response.token;
        this.loginFailed = false;
        console.log(authToken)

        // Save the token to local storage
        this.authService.setAuthToken(authToken);

        this.router.navigate(['/']).then(() => {
          window.location.reload(); // Otherwise the navbar shows Login and does not show Cart, Log out and such
        });
      }, (error) => {
        // Handle error
        console.error('Login error:', error);
        this.loginFailed = true;
        this.errorMessage = 'Login failed. Please check your credentials.';
      });
  }

}
