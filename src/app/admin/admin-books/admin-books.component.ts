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
  book: Book = {
    title: '',
    author: '',
    language: '',
    price: 0,
    publish_year: new Date().getFullYear(),
    description: '',
    pages: 0,
    status: 'Available',
    num_of_copies: 1,
  };
  isEditing: boolean = false;
  search: string = '';

  constructor(private booksService: BooksService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // Load books (with search functionality)
  loadBooks(): void {
    this.booksService.getBooks(this.search).subscribe((data) => {
      this.books = data;
    });
  }

  // Search books by keyword
  searchBooks(): void {
    this.loadBooks();
  }

  // Handle form submission for add/update book
  onSubmit(): void {
    if (this.isEditing) {
      if (this.book.id) { // Ensure `id` exists for editing
        this.booksService.updateBook(this.book.id, this.book).subscribe(() => {
          this.loadBooks();
          this.resetForm();
        });
      }
    } else {
      this.booksService.addBook(this.book).subscribe(() => {
        this.loadBooks();
        this.resetForm();
      });
    }
  }

  // Start editing a book
  editBook(book: Book): void {
    this.book = { ...book }; // Create a copy of the selected book to edit
    this.isEditing = true;
  }

  // Delete a book by ID
  deleteBook(id: number): void {
    this.booksService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }

  // Cancel the editing action
  cancelEdit(): void {
    this.resetForm();
  }

  // Reset the form after adding/editing or canceling
  resetForm(): void {
    this.book = {
      title: '',
      author: '',
      language: '',
      price: 0,
      publish_year: new Date().getFullYear(),
      description: '',
      pages: 0,
      status: 'Available',
      num_of_copies: 1,
    };
    this.isEditing = false;
  }

  openModel = () =>{
    const dialogConfig =new MatDialogConfig();
    dialogConfig.width = '1500px';
    dialogConfig.height = '900px';
    dialogConfig.backdropClass = 'popBackDropClass';
    dialogConfig.enterAnimationDuration = '500ms';
    dialogConfig.exitAnimationDuration = '500ms';
    setTimeout(() => {
    this.dialog.closeAll();
      }, 5000);  // Close after 5 seconds
    this.dialog.open(HomeComponent,dialogConfig)

  }
}