import { Component, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule   // ⭐ Needed for *ngIf
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('mean-stack-frontend');

  constructor(
    public auth: AuthService,   // ⭐ make public so the template can see it
    private router: Router
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

