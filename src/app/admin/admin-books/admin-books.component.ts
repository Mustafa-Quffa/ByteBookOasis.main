import { Component, OnInit } from '@angular/core';
import { BooksService } from '../admin-books/admin-books.service';
import { Book } from './book.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomLayoutComponent } from 'app/custom-layout/custom-layout.component';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FooterComponent } from 'app/footer/footer.component';
import { HomeComponent } from 'app/home/home.component';
import { AddBookComponent } from '../add-book/add-book.component';

@Component({
  selector: 'app-admin-books',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomLayoutComponent,
    ProfileDropdownComponent,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css'], // Corrected from styleUrl
})
export class AdminBooksComponent implements OnInit {
  books: Book[] = [];
  loading: boolean = true;
  totalBooks: number = 0;
  genresCount: number = 0; // Declare the genresCount property
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  hasNextPage: boolean = true; // track if there is a next page

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAllBooks();
    this.loadTotalBookCount();
    this.loadGenresCount(); // Load genres count when component initializes
  }

  loadAllBooks(): void {
    this.loading = true;
    const offset = (this.page - 1) * this.limit;

    this.booksService.getBooks(this.limit, offset).subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
        this.hasNextPage = this.books.length === this.limit;
      },
      error: (error) => {
        console.error('Error fetching books', error);
        this.loading = false;
      }
    });
  }

  loadTotalBookCount(): void {
    this.booksService.getBooksCount().subscribe(count => {
      this.totalBooks = count;
    });
  }

  loadGenresCount(): void {
    this.booksService.getGenresCount().subscribe(count => {
      this.genresCount = count; // Assign the count to genresCount property
    });
  }

  loadMoreBooks(): void {
    this.offset += this.limit; // increase the offset by limit
    this.loadAllBooks();
  }

  nextPage(): void {
    if (this.hasNextPage) { // Only go to next page if there are more books
      this.page++;
      this.loadAllBooks();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadAllBooks();
    }
  }

  openAddBookModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1500px';
    dialogConfig.height = '900px';
    dialogConfig.backdropClass = 'popBackDropClass';
    dialogConfig.enterAnimationDuration = '500ms';
    dialogConfig.exitAnimationDuration = '500ms';
  
    this.dialog.open(AddBookComponent, dialogConfig);
  }

  openUpdateBookModal(book: Book): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1500px';
    dialogConfig.height = '900px';
    dialogConfig.backdropClass = 'popBackDropClass';
    dialogConfig.enterAnimationDuration = '500ms';
    dialogConfig.exitAnimationDuration = '500ms';
    dialogConfig.data = book; // Pass the book data to the update dialog

    this.dialog.open(HomeComponent, dialogConfig);
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.booksService.deleteBook(id).subscribe({
        next: (response) => {
          console.log('Book deleted successfully', response);
          this.loadAllBooks(); // Refresh the book list after deletion
        },
        error: (error) => {
          console.error('Error deleting book', error);
        }
      });
    }
  }
}
