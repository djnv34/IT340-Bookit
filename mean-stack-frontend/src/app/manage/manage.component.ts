import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  standalone: true,
  templateUrl: './manage.html',
  styleUrls: ['./manage.css'],
  imports: [FormsModule, CommonModule]
})
export class ManageComponent {

  // form fields
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  userType = 'client';

  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    // For now, send only email + password to backend
    this.auth.signup(this.email, this.password).subscribe({
      next: () => {
        this.message = "Account created! Redirecting to login...";
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (err) => {
        this.message = err.error?.message || "Signup failed";
      }
    });
  }
}
