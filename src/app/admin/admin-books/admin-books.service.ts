import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:3000/books'; // Replace with your actual API

  constructor(private http: HttpClient) {}

  // Fetch all books, optionally with a search term
  getBooks(search: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}?search=${search}`);
  }

  // Add a new book
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  // Update a book by ID
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book);
  }

  // Delete a book by ID
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
