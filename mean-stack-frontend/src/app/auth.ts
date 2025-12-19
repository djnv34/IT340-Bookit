import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  currentUser: any = null;

  constructor(private http: HttpClient) {}

  signup(
    email: string,
    password: string,
    role: 'client' | 'provider'
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {
      email,
      password,
      role
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      tap((res: any) => {
        this.currentUser = res.user;
      })
    );
  }

  // 🔥 THIS FIXES "LOGGED OUT ON PAGE CHANGE"
  initAuth() {
    const token = this.getToken();
    if (token) {
      this.me().subscribe({
        error: () => this.logout()
      });
    }
  }
}

