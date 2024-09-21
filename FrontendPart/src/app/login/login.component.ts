import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Users } from '../shared/models/users';
import { CartService } from './../shared/services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  errorMessage: boolean | null = null;
  userName: string = '';
  password: string = '';
  signUpUserName: string = '';
  signUpPassword: string = '';
  confirmPassword: string = ''; // Add confirm password field
  isLoading: boolean = false;
  isLogin: boolean = true;
  isLogInButton: boolean = false;

  usersList!: Users[];
  protected _onDestroy = new Subject<void>();

  constructor(private apiService: ApiService, private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
  }


  onLogin(event: Event): void {
    event.preventDefault();
  
    this.apiService.login(this.userName, this.password).subscribe(
      (response) => {
        if (response && response.userId && response.userName) {
          localStorage.setItem('UserID', response.userId);
          localStorage.setItem('UserName', response.userName);
          this.router.navigate(['/products']);
          this.cartService.login()
          this.isLogin = true; // Notify the AppComponent
        } else {
          this.errorMessage = true;
        }
      },
      (error) => {
        if (error.status === 401) {
          console.log('Incorrect password!');
        } else if (error.status === 404) {
          console.log('User not found!');
        } else {
          console.log('An error occurred during login!');
        }
      }
    );
  }
  
  onSignup(event: Event): void {
    event.preventDefault(); // Prevent form from auto-submitting
    
    if (this.signUpPassword !== this.confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }
  
    this.apiService.register(this.signUpUserName, this.signUpPassword).subscribe(
      (response) => {
        console.log('Register successful!');
        this.isLogin = true
      },
      (error) => {
        console.log('Registration failed!', error);
      }
    );
  }

  changeLogin(): void {
    this.isLogin = !this.isLogin;
  }
}
