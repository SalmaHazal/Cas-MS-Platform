import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private baseUrl = 'http://localhost:8080/api/profile';  // l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Méthode pour mettre à jour le username
  updateUsername(id: number, username: string): Observable<any> {
    const params = new URLSearchParams();
    params.set('username', username);

    return this.http.put(`${this}/${id}/username?${params.toString()}`, {});
  }

  // Méthode pour mettre à jour la photo de profil
  updateProfilePicture(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put(`${this.baseUrl}/${id}/photo`, formData);
  }
}
