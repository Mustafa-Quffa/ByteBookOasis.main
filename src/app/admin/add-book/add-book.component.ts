import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AddBooksService } from './add-book.service';
import { Genre } from 'models/genres.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatOptionModule],
  standalone: true,
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  genres: Genre[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private addBookService: AddBooksService
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      language: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      publish_year: ['', Validators.required],
      description: ['', Validators.required],
      pages: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required],
      num_of_copies: ['', [Validators.required, Validators.min(1)]],
      genre_ids: [[]],
      pdfUrl: ['', Validators.required]  // No pattern validation since it's a file input
    });

    this.fetchGenres();
  }

  fetchGenres(): void {
    this.addBookService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
      if (allowedTypes.includes(file.type)) {
        this.selectedImageFile = file;
        this.errorMessage = null;
      } else {
        this.errorMessage = 'Please select a valid image file (PNG, JPEG, GIF).';
        this.selectedImageFile = null;
      }
    }
  }
  onSubmit(): void {
    if (this.bookForm.valid && this.selectedImageFile) {
      // First, upload the file with isBook set to true
      this.addBookService.uploadFile(this.selectedImageFile, true).subscribe({
        next: (uploadResponse) => {
          const imageUrl = uploadResponse.imageUrl; // Retrieve the image URL
  
          // Prepare the book data including the image URL
          const bookData = {
            ...this.bookForm.value,
            image: imageUrl, // Add image URL to the book data
          };
  
          // Send book data to add the new book
          this.addBookService.addNewBook(bookData).subscribe({
            next: () => {
              this.successMessage = 'Book added successfully!';
              this.errorMessage = null;
              this.bookForm.reset();
              this.selectedImageFile = null;
            },
            error: (error) => {
              console.error('Failed to add book:', error);
              this.errorMessage = 'Failed to add book. Please try again.';
              this.successMessage = null;
            },
          });
        },
        error: (error) => {
          console.error('Failed to upload image:', error);
          this.errorMessage = 'Failed to upload image. Please try again.';
          this.successMessage = null;
        },
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly and upload an image.';
      this.successMessage = null;
    }
  }
}