import { Component, computed, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../Servicres/authService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly hasSelectedOption = computed(() => !!this.authService.selectedOption());
  protected readonly isLoggedIn = computed(() => this.authService.isAuthenticated());
  protected selectedOptionValue: string = '';
  protected isReadyToContinue: boolean = false;

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const existingOption = this.authService.selectedOption();
    if (existingOption) {
      this.router.navigate(['/browser-mirror']);
    } else {
      this.router.navigate(['/session-selector']);
    }
  }

  async onOptionChange(value: string) {
    this.selectedOptionValue = value;
    this.isReadyToContinue = false;

    if (value) {
      const result = await this.authService.prepareSession(value);
      this.isReadyToContinue = result?.isValid ?? false;
    }
  }

  selectOption(option: string) {
    this.authService.setSelectedOption(option);
    this.router.navigate(['/browser-mirror']);
  }

  async login(username: string, email: string, password: string) {
    try {
      const res = await this.authService.login({ username, email, password }).toPromise();
      if (res?.token) {
        this.authService.setToken(res.token);
        this.router.navigate(['/home']);
      } else {
        alert(res?.message || 'Login failed.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      alert(error.message || 'Server error during login.');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
