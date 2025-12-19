import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [FormsModule, CommonModule]
})
export class SignupComponent {

  // form fields
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  userType: 'client' | 'provider' = 'client';

  message = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  signup() {
    // DEBUG: confirm role is coming from the form
    console.log('SIGNUP ROLE:', this.userType);

    this.auth.signup(this.email, this.password, this.userType).subscribe({
      next: () => {
        this.message = 'Account created! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.message = err?.error?.message || 'Signup failed';
      }
    });
  }
}

