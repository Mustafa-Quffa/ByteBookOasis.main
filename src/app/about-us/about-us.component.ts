import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true, // Ensure the component is standalone
  imports: [CommonModule], // Import CommonModule for *ngFor and *ngIf
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
 
}
