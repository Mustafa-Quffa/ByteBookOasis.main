import { Component, OnInit } from '@angular/core';
import { User } from './user.model'; // User model
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomLayoutComponent } from 'app/custom-layout/custom-layout.component';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from './admin-user.service';

@Component({
  selector: 'app-admin-users',
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
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  totalUsers: number = 0;
  totalAdmins: number = 0;
  limit: number = 10;
  offset: number = 0;
  page: number = 1;
  hasNextPage: boolean = true; // track if there is a next page



  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAllUsers();
    this.loadTotalCounts();
  }

  loadAllUsers(): void {
    this.loading = true;
    const offset = (this.page - 1) * this.limit;

    this.userService.getAllUsers(this.limit, offset).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
        this.hasNextPage = this.users.length === this.limit;
      },
      error: (error) => {
        console.error('Error fetching users', error);
        this.loading = false;
      }
    });
  }

  loadTotalCounts(): void {
    this.userService.getTotalUsers().subscribe(count => {
      this.totalUsers = count;
    });

    this.userService.getTotalAdmins().subscribe(count => {
      this.totalAdmins = count;
    });
  }

  loadMoreUsers(): void {
    this.offset += this.limit; // increase the offset by limit
    this.loadAllUsers();
  }

  nextPage(): void {
    if (this.hasNextPage) { // Only go to next page if there are more users
      this.page++;
      this.loadAllUsers();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadAllUsers();
    }
  }
}
