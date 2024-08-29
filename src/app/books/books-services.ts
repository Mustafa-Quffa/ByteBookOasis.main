// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Book } from '../books/book.model'; // Adjust the path to your Book model

// @Injectable({
//   providedIn: 'root'
// })
// export class BookService {

//   private baseUrl = '/api/books'; // Adjust the URL according to your backend

//   constructor(private http: HttpClient) {}

//   searchBooks(criteria: any): Observable<Book[]> {
//     return this.http.get<Book[]>(this.baseUrl, {
//       params: {
//         title: criteria.title || '',
//         author: criteria.author || '',
//         genre: criteria.genre || '',
//         search: criteria.searchQuery || ''
//       }
//     });
//   }
// }
