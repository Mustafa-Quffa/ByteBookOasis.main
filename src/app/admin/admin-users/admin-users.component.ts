import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomLayoutComponent } from 'app/custom-layout/custom-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';

interface User {
  id: number;
  name: string;
  email: string;
  status: string; // 'Active' or 'Inactive'
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CustomLayoutComponent,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ProfileDropdownComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = []; // Stores all users
  search: string = ''; // For the search functionality
  totalUsers: number = 0;
  activeUsers: number = 0;
  inactiveUsers: number = 0;
  dialog: MatDialog; // Declare dialog as a class property

  // Mock user data
  mockUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active' },
    { id: 4, name: 'David Green', email: 'david@example.com', status: 'Inactive' },
    { id: 5, name: 'Eve Adams', email: 'eve@example.com', status: 'Active' },
    { id: 6, name: 'Frank White', email: 'frank@example.com', status: 'Active' },
    { id: 7, name: 'Grace Black', email: 'grace@example.com', status: 'Inactive' },
    { id: 8, name: 'Henry Ford', email: 'henry@example.com', status: 'Active' },
    { id: 9, name: 'Ivy Thompson', email: 'ivy@example.com', status: 'Active' },
    { id: 10, name: 'Jackie Chan', email: 'jackie@example.com', status: 'Inactive' }
  ];

  constructor(private matDialog: MatDialog) {
    this.dialog = matDialog; // Assign injected service to the dialog property
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.calculateStats();
  }

  // Loads mock users data
  fetchUsers(): void {
    this.users = this.mockUsers.slice(0, 10); // Initial 10 users
  }

  // Searches for users by name or email
  searchUsers(): void {
    if (this.search.trim()) {
      this.users = this.mockUsers.filter(user =>
        user.name.toLowerCase().includes(this.search.toLowerCase()) ||
        user.email.toLowerCase().includes(this.search.toLowerCase())
      );
    } else {
      this.fetchUsers(); // Reset the user list if search is empty
    }
  }

  openAddUserModel() {
    const dialogConfig = {
      width: '600px',
      data: {} // Pass any data needed for the dialog
    };
    this.dialog.open(AdminUsersComponent, dialogConfig); // Open the AddUserComponent
  }

  // Calculates basic user statistics
  calculateStats(): void {
    this.totalUsers = this.mockUsers.length;
    this.activeUsers = this.mockUsers.filter(user => user.status === 'Active').length;
    this.inactiveUsers = this.mockUsers.filter(user => user.status === 'Inactive').length;
  }

  // Opens a modal for editing a user (Mock implementation)
  editUser(user: User): void {
    console.log('Edit user:', user);
    // Simulate editing user here (for mock purposes, no changes are actually made)
    alert(`Editing user: ${user.name}`);
  }

  // Deletes a user by ID (Mock implementation)
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.mockUsers = this.mockUsers.filter(user => user.id !== userId); // Remove user from mock data
      this.fetchUsers(); // Reload the first 10 users
      this.calculateStats(); // Update stats after deletion
    }
  }

  // Simulate adding a new user
  addUser(): void {
    const newUser: User = {
      id: this.mockUsers.length + 1,
      name: `New User ${this.mockUsers.length + 1}`,
      email: `newuser${this.mockUsers.length + 1}@example.com`,
      status: 'Active'
    };
    this.mockUsers.push(newUser); // Add new user to the mock list
    this.fetchUsers(); // Refresh user list
    this.calculateStats(); // Recalculate stats
  }
}
