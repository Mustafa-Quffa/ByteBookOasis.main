import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AddBooksService } from 'app/admin/add-book/add-book.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports:[RouterLink]
})
export class ProfileComponent implements OnInit {
  profileImageUrl: string = ''; // URL of the current profile image
  selectedFile: File | null = null;

  constructor(private addBookService : AddBooksService) { }

  ngOnInit(): void {
    // Initialize your profile image if you have a URL
    this.profileImageUrl = 'path/to/default-image.jpg'; // Replace with actual path or fetch from backend
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.selectedFile = input.files[0];
    }
  }

  uploadProfileImage(): void {
    if (this.selectedFile) {
      this.addBookService.uploadFile(this.selectedFile, false).subscribe({
        next: (response) => {
          this.profileImageUrl = response.imageUrl; // Update the profile image URL
          console.log('Profile image updated successfully:', response.imageUrl);
        },
        error: (err) => {
          console.error('Failed to upload profile image:', err);
        }
      });
    }
  }

}
