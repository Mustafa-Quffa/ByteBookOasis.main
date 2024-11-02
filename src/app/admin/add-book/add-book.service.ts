import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from '../admin-books/book.model';


@Injectable({
  providedIn: 'root'
})
export class AddBooksService {
  private books: Book[] = [];
  private ListOfGenres = 'http://localhost:3000/genres'; // Adjust the URL as needed
  private baseUrl = 'http://localhost:3000/book/add-new-book';

  constructor(private http: HttpClient) {}
 
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ListOfGenres}`);
  }

  addNewBook(bookData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, bookData);
  }
}
