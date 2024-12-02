import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private signupUrl = 'http://localhost:3000/user/signup'; // Your backend signup URL
  private nationalitiesUrl = 'http://localhost:3000/nationality'; // Your backend nationality URL

  constructor(private http: HttpClient) {}

  // API call to fetch the list of nationalities
  getNationalities(): Observable<any[]> {
    return this.http.get<any[]>(this.nationalitiesUrl)
  }

  // API call to sign up a user
  signup(userData: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, userData)
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend or server error
      errorMessage = `Server error (status: ${error.status}): ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
