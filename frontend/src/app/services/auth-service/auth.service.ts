import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public email: any;
  public isAuthenticated: boolean = false;
  public roles: any;
  public accessToken!: string;

  constructor(private router: Router, private http: HttpClient) {
    this.loadJwtTokenFromLocalStorage();
  }

  public register(
    fullName: string,
    email: string,
    password: string,
    gender: string,
    question: string
  ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const body = { fullName, email, password, gender, question };

    return this.http.post(`${environment.backendHost}/auth/register`, body, {
      headers,
    });
  }

  public login(email: string, password: string) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    const body = { email, password };

    return this.http.post(
      `${environment.backendHost}/auth/login`,
      body,
      options
    );
  }

  loadProfile(data: any) {
    this.accessToken = data['access-token'];
    const decodedJwt = jwtDecode(this.accessToken) as any;
    this.email = decodedJwt.sub;
    this.roles = decodedJwt['scope'];
    window.localStorage.setItem('jwt-token', this.accessToken);
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = '';
    this.roles = undefined;
    this.email = undefined;
    window.localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('/login');
  }

  loadJwtTokenFromLocalStorage() {
    const token = window.localStorage.getItem('jwt-token');

    if (token) {
      const isValid = this.validateToken(token);

      if (isValid) {
        this.loadProfile({ 'access-token': token });
        this.router.navigateByUrl('/admin');
      } else {
        window.localStorage.removeItem('jwt-token');
        this.router.navigateByUrl('/login');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  validateToken(token: string): boolean {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Invalid token format', error);
      return false;
    }
  }

  public logValues() {
    console.log('Email:', this.email);
    console.log('Is Authenticated:', this.isAuthenticated);
    console.log('Roles:', this.roles);
    console.log('Access Token:', this.accessToken);
  }
}
