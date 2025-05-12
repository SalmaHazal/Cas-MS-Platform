import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  public updateProfile(
    fullName: string,
    password: string,
    functionality: string,
    profilePicture: File
  ) {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('password', password);
    formData.append('functionality', functionality);
    if (profilePicture) {
      formData.append('file', profilePicture);
    }

    return this.http.patch(`${environment.backendHost}/update`, formData);
  }
}
