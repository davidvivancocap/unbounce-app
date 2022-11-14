import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  sendFormData(payload) {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<any>('api/servicios/envioSGC', payload, {
      ...headers,
    });
  }
}
