import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin-dashboard/admin-dashboard.service';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { CustomLayoutComponent } from 'app/custom-layout/custom-layout.component';
import { NgChartsModule } from 'ng2-charts';  

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ProfileDropdownComponent, CustomLayoutComponent, NgChartsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  dashboardData: any = {};
  usersCount: number = 0;
  booksCount: number = 0;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Users', 'Books'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataset[] = [
    { data: [this.usersCount, this.booksCount], label: 'Count' }
  ];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
    });

    // Fetch the counts for users and books
    this.adminService.getAllUsers().subscribe(count => {
      this.usersCount = count;
      this.updateChartData();
    });

    this.adminService.getAllBooks().subscribe(count => {
      this.booksCount = count;
      this.updateChartData();
    });
  }

  updateChartData(): void {
    this.barChartData[0].data = [this.usersCount, this.booksCount];
  }
}
