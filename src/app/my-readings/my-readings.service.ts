import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from 'app/admin/admin-books/book.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root',
})
export class MyReadingsService {
  private baseUrl = 'http://localhost:3000/user-books';

  constructor(private http: HttpClient) {}

  // Unassign book from user
  unassignBookFromUser(userId: number, bookId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/unassign`, {
      body: { userId, bookId },
    });
  }

  // Fetch assigned books for a user
  getAssignedBooks(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/assigned-books/${userId}`);
  }
}
