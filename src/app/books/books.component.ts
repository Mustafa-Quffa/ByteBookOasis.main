import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})


export class BooksComponent {
searchCriteria = {
  title: '',
  author: '',
  genre: '',
  searchQuery: ''
};

onSearch() {
  // Handle the search logic here or prepare for backend integration
}
}
