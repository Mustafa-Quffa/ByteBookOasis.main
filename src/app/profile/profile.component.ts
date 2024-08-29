import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports:[RouterLink]
})
export class ProfileComponent implements OnInit {
  
  user = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    phone: '+1234567890'

    
  };

  constructor() { }

  ngOnInit(): void {
    // Fetch user data from a service or API here
    
  }

}
