import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  constructor(
    private auth: AuthService,
    private router: Router   // ← inject Router here
  ) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        this.message = "Login successful!";
        console.log("TOKEN:", this.auth.getToken());

        // Load current user from backend
        this.auth.me().subscribe({
          next: (res) => {
            console.log("ME endpoint response:", res);
            // Redirect to homepage after ME loads
            this.router.navigate(['/']);   // ← GO HOME
          },
          error: (err) => console.error("Error calling /me:", err)
        });
      },
      error: () => {
        this.message = "Invalid credentials";
      }
    });
  }
}

