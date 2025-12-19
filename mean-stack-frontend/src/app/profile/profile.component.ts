import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [FormsModule, CommonModule]
})
export class ProfileComponent {

  // form fields
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  userType = 'client';

  message = '';

  constructor(private auth: AuthService, private router: Router) {}

}

