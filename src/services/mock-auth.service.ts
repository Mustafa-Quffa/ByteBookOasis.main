import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {

  private mockUsers = [
    { username: 'testuser', password: 'password123' }
  ];

  constructor() { }

  login(username: string, password: string): Observable<any> {
    const user = this.mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      return of({ success: true, token: 'mock-token' }).pipe(delay(500)); // Simulating network delay
    } else {
      return of({ success: false, message: 'Invalid credentials' }).pipe(delay(500));
    }
  }

  signup(username: string, password: string): Observable<any> {
    if (this.mockUsers.some(u => u.username === username)) {
      return of({ success: false, message: 'User already exists' }).pipe(delay(500));
    } else {
      this.mockUsers.push({ username, password });
      return of({ success: true, message: 'User registered successfully' }).pipe(delay(500));
    }
  }
}
