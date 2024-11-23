import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowseService } from './browse.service';
import { Book } from 'app/admin/admin-books/book.model';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
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

  showBackToTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const yOffset = window.scrollY || document.documentElement.scrollTop;
    this.showBackToTop = yOffset > 300; // Show the button when scrolled 300px down
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  constructor(private browseService: BrowseService) {}

  ngOnInit(): void {
    
    this.loadPopularBooks();
    this.loadRecommendedBooks();
    this.loadBooksByGenres();
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
