import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  public updateProfile(
    fullName: string,
    password: string,
    functionality: string
  ) {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    const body = { fullName, password, functionality };

    return this.http.patch(`${environment.backendHost}/update`, body, options);
  }
}
