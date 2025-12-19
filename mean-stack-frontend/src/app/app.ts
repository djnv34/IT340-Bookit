import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  title = signal('mean-stack-frontend');

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // 🔥 THIS is what prevents logout on navigation / refresh
    this.auth.initAuth();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

