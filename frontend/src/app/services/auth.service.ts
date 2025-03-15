import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public email: any;
  public isAuthenticated: boolean = false;
  public roles: any;
  public accessToken!: string;

  constructor(private router: Router, private http: HttpClient) {}

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

  public register(fullName: string, email: string, password: string, gender: string, question: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  
    const body = { fullName, email, password, gender, question};
  
    return this.http.post(
      `${environment.backendHost}/auth/register`,
      body,
      { headers}
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
      this.loadProfile({ 'access-token': token });
      this.router.navigateByUrl('/admin');
    }
  }
}
