export interface Book {
  id?: number;
  title: string;
  author: string;
  language: string;
  price: number;
  publish_year: number;
  description: string;
  rating: number;
  pages: number;
  status: string;
  num_of_copies: number;
  image: string;
  bookDetails?: BookDetails; // Add this field for nested book details
  pdfUrl?: string; // Optional, as it may not always be present

}

export interface BookDetails {
  createdAt: string;
  updatedAt: string;
  id: number;
  title: string;
  author: string;
  language: string;
  price: string;
  publish_year: number;
  description: string;
  pages: number;
  image: string;
  status: string;
  rating: string;
  num_of_copies: number;
}
