import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3000/admin'; // Adjust if necessary

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`);
  }

  // getAllBooks(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/book`);
  // }
}
