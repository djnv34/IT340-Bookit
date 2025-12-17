import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,     // ✅ ADD THIS
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('mean-stack-frontend');

  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

