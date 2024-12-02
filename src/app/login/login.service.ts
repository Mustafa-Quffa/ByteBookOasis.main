import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loginUrl = 'http://localhost:3000/user/logIn'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          
          // Save the full user object, including the 'id'
          const user = {
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            user_name: response.user_name,
            role: response.role,
            id: response.id, // Make sure the 'id' is saved in localStorage
          };
          
          localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user object with id
        }
      })
    );
  }
  isAuthenticated(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // setAuthenticationStatus(status: boolean): void {
  //   this.loggedIn.next(status);
  // }

  // logout(): void {
  //   this.setAuthenticationStatus(false);
  //   // Perform any other logout operations, like clearing tokens
  // }
}
