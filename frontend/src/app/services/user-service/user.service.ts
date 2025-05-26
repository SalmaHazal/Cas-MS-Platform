import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../../../models/UserProfile';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: UserProfile | null = null;

  constructor(private http: HttpClient) {}

  public fetchUserDetails(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${environment.backendHost}/auth/user`);
  }
}
