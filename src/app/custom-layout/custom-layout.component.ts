import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileDropdownComponent } from 'app/profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'app-custom-layout',
  standalone: true,
  imports: [CommonModule,ProfileDropdownComponent,RouterLink],
  templateUrl: './custom-layout.component.html',
  styleUrl: './custom-layout.component.css'
})
export class CustomLayoutComponent {

}
