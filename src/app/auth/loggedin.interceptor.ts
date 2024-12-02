import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '..//../services/auth.service';

@Injectable()
export class LoggedinInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('Intercepting request. Token:', token);  // Debug log for token

    // If a token is found, add it to the request headers
    if (token && this.authService.checkLogIn()) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cloned request with Authorization header:', clonedRequest); // Log cloned request
      return next.handle(clonedRequest);
    } else {
      console.log('No token found. Proceeding without Authorization header.');
      return next.handle(req);
    }
  }
}
