import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default to false
  private loginUrl = 'http://localhost:3000/user/logIn'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  login(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.loginUrl, loginData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setAuthenticationStatus(status: boolean): void {
    this.loggedIn.next(status);
  }

  logout(): void {
    this.setAuthenticationStatus(false); // Reset authentication status
    // Perform any other logout operations, like clearing tokens
  }

}
