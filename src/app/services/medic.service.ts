import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medic } from '../interfaces/medic';

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  constructor(private http: HttpClient) { }

  loadMedics(from: number = 0) {
    return this.http.get<{ medics: Medic[]; total: number }>('/api/medics', { params: { offset: from } });
  }

  getMedicById(id: string): Observable<Medic> {
    return this.http.get<Medic>(`/api/medics/${id}`);
  }

  createMedic(medic: { name: string, hospital_id: string }) {
    return this.http.post('/api/medics', medic);
  }

  updateMedic(medic: Medic) {
    return this.http.put(`/api/medics/${medic._id}`, medic);
  }

  deleteMedic(id: string) {
    return this.http.delete(`/api/medics/${id}`);
  }
}
