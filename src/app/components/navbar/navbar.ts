import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  popupOpen: boolean = true;
  menuOpen: boolean = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    if (!this.popupOpen) {
      this.menuOpen = !this.menuOpen;
    }
  }

  redirectToLogin(): void {
    this.popupOpen = false;
    this.router.navigate(['/login']);
  }

  redirectToSignup(): void {
    this.popupOpen = false;
    this.router.navigate(['/signup']);
  }

  closePopup(): void {
    this.popupOpen = false;
  }
}
