import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calender',
  standalone: true,
  templateUrl: './calender.html',
  styleUrls: ['./calender.css'],
  imports: [FormsModule, CommonModule]
})
export class CalenderComponent {

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
