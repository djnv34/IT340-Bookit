import { Component } from '@angular/core';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.html',
  styleUrls: ['./client-register.css'],  // Corrected 'styleUrl' to 'styleUrls'
})
export class ClientRegister {
  // Declare a client object to hold form data
  client = {
    name: '',
    email: '',
    password: ''
  };

  // Handle form submission
  onSubmit() {
    console.log('Client registered:', this.client);

    // You could add an HTTP request here to send the data to the backend (Node.js/Express)
  }
}

