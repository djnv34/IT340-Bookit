import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isBrowser: boolean;

  currentUser: any = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ------------------------
  // SIGNUP
  // ------------------------
  signup(
    email: string,
    password: string,
    role: 'client' | 'provider'
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {
      email,
      password,
      role,
    });
  }

  // ------------------------
  // LOGIN
  // ------------------------
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res: any) => {
        // 🔑 Handle ANY backend token naming
        const token =
          res.token ||
          res.accessToken ||
          res.jwt ||
          res.data?.token;

        if (!token) {
          console.error('Login response:', res);
          throw new Error('No token returned from backend');
        }

        if (this.isBrowser) {
          localStorage.setItem('token', token);
        }
      })
    );
  }

  // ------------------------
  // LOGOUT
  // ------------------------
  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.currentUser = null;
  }

  // ------------------------
  // TOKEN ACCESS
  // ------------------------
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ------------------------
  // GET CURRENT USER
  // ------------------------
  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      tap((res: any) => {
        // backend usually returns { user: {...} }
        this.currentUser = res.user ?? res;
      })
    );
  }

  // ------------------------
  // INIT AUTH (on refresh)
  // ------------------------
  initAuth() {
    const token = this.getToken();

    if (token) {
      this.me().subscribe({
        error: () => this.logout(),
      });
    }
  }
}

