export interface Book {
  id?: number;  // Optional, especially when adding a new book
  title: string;
  author: string;
  language: string;
  price: number;
  publish_year: number;
  description: string;
  pages: number;
  status: string;  // Available, Borrowed, etc.
  num_of_copies: number;
}
