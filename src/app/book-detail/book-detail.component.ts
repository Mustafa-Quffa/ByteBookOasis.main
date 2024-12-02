import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'app/admin/admin-books/book.model';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public book: any,
    private dialogRef: MatDialogRef<BookDetailComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
