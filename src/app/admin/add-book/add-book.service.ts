import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Book } from '../admin-books/book.model';


@Injectable({
  providedIn: 'root'
})
export class AddBooksService {
  private books: Book[] = [];
  private ListOfGenres = 'http://localhost:3000/genres'; // Adjust the URL as needed
  private baseUrl = 'http://localhost:3000/book/add-new-book';
  private readonly apiUrl = 'http://localhost:3000/upload';


  constructor(private http: HttpClient) {}
 
  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ListOfGenres}`);
  }

  addNewBook(bookData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, bookData);
  }

  uploadFile(file: File, isBook: boolean): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    // Add the `isBook` parameter as a query string
    const isBookParam = isBook ? '1' : '0';
    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/image?isBook=${isBookParam}`,
      formData
    );
  }
}
