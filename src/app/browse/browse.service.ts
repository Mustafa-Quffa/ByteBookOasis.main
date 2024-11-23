import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from 'app/admin/admin-books/book.model';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  private apiUrl = 'http://localhost:3000/book'; // Replace with your backend URL
  private baseUrl = 'http://localhost:3000/upload';
  private publicPath = 'http://localhost:3000'; // Base URL for serving public files
  private ListOfGenres = 'http://localhost:3000/genres'; // Adjust the URL as needed
  private booksByGenres = 'http://localhost:3000/book';



  constructor(private http: HttpClient) {}

  getBooksGroupedByGenres(): Observable<{ [genre: string]: Book[] }> {
    return this.http.get<{ [genre: string]: Book[] }>(`${this.booksByGenres}/grouped-by-genre`).pipe(
      map(response => {
        for (const genre in response) {
          response[genre] = response[genre].map((book: Book) => {
            book.image = `${this.publicPath}${book.image}`; // Adjust image paths
            return book;
          });
        }
        return response;
      })
    );
  }
  
  uploadFile(file: File, isBook: boolean): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const isBookParam = isBook ? '1' : '0';
    return this.http.post<{ imageUrl: string }>(
      `${this.baseUrl}/image?isBook=${isBookParam}`,
      formData
    );
  }

  getBooks(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/books`, {
      params: { page, limit },
    }).pipe(
      map(response => {
        response.books = response.books.map((book: Book) => {
          book.image = `${this.publicPath}${book.image}`;
          return book;
        });
        return response;
      })
    );
  }

  getBooksByFilter(filter: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('filter', filter)
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}/books`, { params }).pipe(
      map(response => {
        response.books = response.books.map((book: Book) => {
          book.image = `${this.publicPath}${book.image}`;
          return book;
        });
        return response;
      })
    );
  }

  searchBooks(query: string, page: number = 1, limit: number = 10): Observable<{ books: Book[], total: number }> {
    const params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<{ books: Book[], total: number }>(`${this.apiUrl}/search`, { params }).pipe(
      map(response => {
        response.books = response.books.map((book: Book) => {
          book.image = `${this.publicPath}${book.image}`;
          return book;
        });
        return response;
      })
    );
  }

  
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      map((book: Book) => {
        book.image = `${this.publicPath}${book.image}`;
        return book;
      })
    );
  }
}
