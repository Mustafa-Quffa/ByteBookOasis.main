import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private totalBooks = 'http://localhost:3000/book/total-books'; 
  private Genres = 'http://localhost:3000/genres/total-genres'; 
  private AllBooks = 'http://localhost:3000/book/books';
  private apiUrl = 'http://localhost:3000/book'; 




  constructor(private http: HttpClient) {}
  getBooksCount(): Observable<number> {
    return this.http.get<number>(`${this.totalBooks}`);
  }
  getGenresCount(): Observable<number> {
    return this.http.get<any>(`${this.Genres}`);
  }

  getBooks(limit?: number, offset?: number): Observable<Book[]> {
    let url = `${this.AllBooks}`;
    if (limit !== undefined && offset !== undefined) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return this.http.get<Book[]>(url);
  }

  updateBook(id: number, bookData: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, bookData);
  }

  // Delete a book
  deleteBook(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
