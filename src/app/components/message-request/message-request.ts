import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageRequest } from '../../../Module';
import { MessageRequestService } from '../../../Servicres/MessageRequestService';

@Component({
  selector: 'app-message-request',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './message-request.html',
  styleUrl: './message-request.css'
})

export class MessageRequestComponent {
  model: MessageRequest = {
    messageText: '',
    recipientName: '',
    recipientPhone: '',
    recipientEmail: ''
  };

  constructor(private service: MessageRequestService) {}

  submit() {
    this.service.sendMessage(this.model).subscribe({
      next: res => alert('Message sent!'),
      error: err => alert('Error sending message')
    });
  }
}
