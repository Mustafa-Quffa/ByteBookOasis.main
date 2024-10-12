import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-dashboard/admin-dashboard.service';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';
import { CommonModule } from '@angular/common';
import { CustomLayoutComponent } from 'app/custom-layout/custom-layout.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports:[CommonModule,ProfileDropdownComponent,CustomLayoutComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardData: any = {};
  users: any[] = [];
  books: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
    });

    // this.adminService.getAllUsers().subscribe(data => {
    //   this.users = data;
    // });

    // this.adminService.getAllBooks().subscribe(data => {
    //   this.books = data;
    // });
  }
}
