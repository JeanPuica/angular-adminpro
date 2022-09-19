import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  updatePhoto(file: File, type: 'users' | 'medics' | 'hospitals', id: string) {
    const formData = new FormData();
    formData.append('imagen', file);
    return this.http.put(`/api/upload/${type}/${id}`, formData);
  }
}
