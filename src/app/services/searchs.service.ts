import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  constructor(private http: HttpClient) {}

  search(type: 'users' | 'medics' | 'hospitals', value: string = '') {
    return this.http.get<{ results: any[] }>(
      `/api/todo/collection/${type}/${value}`
    );
  }
}
