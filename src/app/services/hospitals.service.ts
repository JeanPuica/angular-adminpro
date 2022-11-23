import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../interfaces/hospital';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  loadHospitals(from: number = 0) {
    return this.http.get<{ total: number; hospitals: Hospital[] }>(
      '/api/hospitals',
      {
        params: { offset: from },
      }
    );
  }

  createHospital(name: string) {
    return this.http.post<{ hospital: Hospital }>('/api/hospitals', { name });
  }

  updateHospital(id: string, name: string) {
    return this.http.put(`/api/hospitals/${id}`, { name });
  }

  deleteHospital(id: string) {
    return this.http.delete(`/api/hospitals/${id}`);
  }
}
