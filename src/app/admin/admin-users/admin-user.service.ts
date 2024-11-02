import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model'; // Adjust the import path based on your structure

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user/users'; 
  private totalUsersUrl = 'http://localhost:3000/user/total-users'; 
  private totalAdminsUrl = 'http://localhost:3000/user/total-admins'; 

  constructor(private http: HttpClient) {}

  getAllUsers(limit?: number, offset?: number): Observable<User[]> {
    let url = `${this.apiUrl}`;
    if (limit !== undefined && offset !== undefined) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return this.http.get<User[]>(url);
  }

    // Method to get the total number of users
    getTotalUsers(): Observable<number> {
      return this.http.get<number>(this.totalUsersUrl);
    }
  
    // Method to get the total number of admins
    getTotalAdmins(): Observable<number> {
      return this.http.get<number>(this.totalAdminsUrl);
    }
}
