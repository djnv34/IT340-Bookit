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

      // Load current user
      this.auth.me().subscribe({
        next: () => {
          const role = this.auth.currentUser.role;

          // 🔀 ROLE-BASED REDIRECT
          if (role === 'provider') {
            this.router.navigate(['/manage']); // or /manage
          } else {
            this.router.navigate(['/']); // client home
          }
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

