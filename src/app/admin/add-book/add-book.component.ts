import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AddBooksService } from './add-book.service';
import { Genre } from 'models/genres.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule,MatOptionModule,],
  standalone: true
})
export class AddBookComponent implements OnInit {
  bookForm!: FormGroup;
  genres: Genre[] = [];  
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private addBookService:  AddBooksService
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
      image: [''],
      status: ['', Validators.required],
      num_of_copies: ['', [Validators.required, Validators.min(1)]],
      genre_ids: [[]],  // Ensure this is an array for the genre IDs
    });

    // Fetch available genres
    this.fetchGenres();
  }

  fetchGenres(): void {
    this.addBookService.getGenres().subscribe((genres) => {
      this.genres = genres;
    });
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = this.bookForm.value;
      console.log('Submitting book data:', formData);

      this.addBookService.addNewBook(formData).subscribe({
        next: (response) => {
          console.log('Book added successfully:', response);
          this.successMessage = 'Book added successfully!';
          this.errorMessage = null;
          this.bookForm.reset();
        },
        error: (error) => {
          console.error('Error adding book:', error);
          this.successMessage = null;
          this.errorMessage = 'Failed to add book. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }
}