import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from '../admin/admin-books/book.model'; // Adjust the path as needed
import { MyReadingsService } from './my-readings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-readings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-readings.component.html',
  styleUrls: ['./my-readings.component.css'],
})
export class MyReadingsComponent implements OnInit {
  assignedBooks: Book[] = [];  // Make sure it's an array of books
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private myReadingsService: MyReadingsService) {}

  ngOnInit(): void {
    this.fetchAssignedBooks();
  }

  fetchAssignedBooks(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser ? loggedInUser.id : null;
  
    if (userId) {
      this.myReadingsService.getAssignedBooks(userId).subscribe({
        next: (books: any[]) => {  // Use any[] if bookDetails is nested
          // Ensure the books contain 'bookDetails' if the API returns it
          this.assignedBooks = books.map(book => ({
            ...book,
            bookDetails: book.bookDetails || {}  // Safeguard if bookDetails is missing
          }));
          this.errorMessage = null;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error fetching assigned books:', error);
          this.errorMessage = 'Failed to fetch assigned books. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'User not logged in. Please log in first.';
    }
  }
  
  startReading(): void {
    // Logic to start reading, such as navigating to the book's detailed page or marking it as in-progress
    console.log('Starting to read...');
  }

  unassignBook(book: Book): void {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    
    if (currentUser && currentUser.id && book.id) {
      this.myReadingsService.unassignBookFromUser(currentUser.id, book.id).subscribe({
        next: (response) => {
          alert(response.message);
          this.fetchAssignedBooks(); // Refresh the assigned books list
        },
        error: (err) => {
          console.error('Failed to unassign book:', err);
          alert('Failed to unassign book. Please try again.');
        },
      });
    } else {
      alert('Unable to unassign book. Missing user or book information.');
    }
  }
  
  
  
}
