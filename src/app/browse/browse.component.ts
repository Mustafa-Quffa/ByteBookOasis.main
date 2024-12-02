import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowseService } from './browse.service';
import { Book } from 'app/admin/admin-books/book.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookDetailComponent } from 'app/book-detail/book-detail.component';
import { AuthService } from '@services/auth.service';


@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  isAuthenticated: boolean = false; // Local variable to store authentication status
  popularBooks: Book[] = [];
  recommendedBooks: Book[] = [];
  booksByGenre: { [genre: string]: Book[] } = {};
  searchResults: Book[] = [];
  searchQuery: string = '';
  error: string = '';
  
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  genres: string[] = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Science Fiction',
    'Fantasy',
    'Biography',
    'History',
    'Romance',
    'Thriller',
    'Horror'
  ];

  showModal: boolean = false;
  isModalOpen = false;
  selectedBook: any = null;
  

  constructor(private browseService: BrowseService, private dialog: MatDialog,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.checkLogIn();
    console.log('Is authenticated in BrowseComponent:', this.isAuthenticated);
    this.loadPopularBooks();
    this.loadRecommendedBooks();
    this.loadBooksByGenres();
  }

  openModal(book: any) {
    this.selectedBook = book;
    this.isModalOpen = true;
  }
  

  closeModal() {
    this.isModalOpen = false;
    this.selectedBook = null;
  }
  
  

  loadPopularBooks(): void {
    this.browseService.getBooksByFilter('Popular', this.currentPage, this.pageSize).subscribe({
      next: (data: { books: Book[]; total: number }) => {
        this.popularBooks = data.books;
        this.totalPages = Math.ceil(data.total / this.pageSize);
      },
      error: () => (this.error = 'Failed to load popular books'),
    });
  }
  
  startReading(book: Book): void {
    // Logic to start reading the book (maybe navigate to a reader page or update the reading status)
    console.log('Started Reading:', book);
  }

  
  handleButtonClick() {
    // Implement your action here (e.g., alert, or another action)
    console.log('Button clicked, take action now!');
  }

  loadRecommendedBooks(): void {
    this.browseService.getBooksByFilter('Recommended', this.currentPage, this.pageSize).subscribe({
      next: (data: { books: Book[]; total: number }) => {
        this.recommendedBooks = data.books;
        this.totalPages = Math.ceil(data.total / this.pageSize);
      },
      error: () => (this.error = 'Failed to load recommended books'),
    });
  }

  loadBooksByGenres(): void {
    this.browseService.getBooksGroupedByGenres().subscribe({
      next: (data) => {
        this.booksByGenre = data; // Update the booksByGenre map with API data
      },
      error: () => (this.error = 'Failed to load books grouped by genre'),
    });
  }

  searchBooks(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }
    this.browseService.searchBooks(this.searchQuery, this.currentPage, this.pageSize).subscribe({
      next: (data: { books: Book[]; total: number }) => {
        this.searchResults = data.books;
        this.totalPages = Math.ceil(data.total / this.pageSize);
      },
      error: () => (this.error = 'Failed to search books'),
    });
  }


  assignBook(book: Book): void {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    console.log('Current User from LocalStorage:', currentUser);  // Log the user info
  
    if (currentUser && currentUser.id) {
      console.log('User is logged in');
      const userId = currentUser.id;
      console.log('User ID:', userId);
  
      if (book.id !== undefined && book.id !== null) {
        this.browseService.assignBookToUser(book.id, userId).subscribe({
          next: (response) => {
            if (typeof response === 'string') {
              // If the response is a message (i.e., the book is already assigned)
              alert(response);  // Show the message to the user
            } else {
              console.log('Book assigned successfully:', response);
              alert(`Book "${book.title}" assigned to your account.`);
              // Optionally, refresh the page or update the UI
              window.location.reload();  // Forces a full page reload
            }
          },
          error: (err) => {
            console.error('Failed to assign book:', err);
            alert('Failed to assign book. Please try again.');
          },
        });
        
      }}}
    

  onPageChange(page: number): void {
    this.currentPage = page;
    if (this.searchQuery.trim()) {
      this.searchBooks();
    } else {
      this.loadPopularBooks();
      this.loadRecommendedBooks();
      this.loadBooksByGenres();
    }
  }

  // Generate an array of page numbers for pagination
  pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
