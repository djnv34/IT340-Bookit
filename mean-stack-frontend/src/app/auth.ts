import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type AuthStatus = 'loading' | 'authenticated' | 'guest';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isBrowser: boolean;

  // 🔐 AUTH STATE (single source of truth)
  currentUser: any = null;
  authStatus: AuthStatus = 'loading';

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

        // user will be set by /me()
        this.authStatus = 'loading';
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
    this.authStatus = 'guest';
  }

  // ------------------------
  // TOKEN ACCESS
  // ------------------------
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.authStatus === 'authenticated';
  }

  // ------------------------
  // GET CURRENT USER
  // ------------------------
  me(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`).pipe(
      tap((res: any) => {
        this.currentUser = res.user ?? res;
        this.authStatus = 'authenticated';
      })
    );
  }

  // ------------------------
  // INIT AUTH (RUN ON APP START)
  // ------------------------
  initAuth() {
    if (!this.isBrowser) {
      // SSR / hydration phase — do nothing
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      this.authStatus = 'guest';
      return;
    }

    this.me().subscribe({
      next: () => {
        // already handled in tap
      },
      error: () => {
        // token invalid / expired
        this.logout();
      }
    });
  }
}

