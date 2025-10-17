import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environments.pro';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly token = signal<string | null>(localStorage.getItem('jwt'));
  private readonly signedUp = signal<boolean>(false);
  private readonly selectedOptionSignal = signal<string>(localStorage.getItem('selectedOption') || '');

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string; message: string }>(`${this.baseUrl}/login`, { email, password });
  }

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('jwt', token);
  }

  isAuthenticated(): boolean {
    return !!this.token();
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  signup(fullName: string, email: string, password: string): Promise<{ success: boolean }> {
    return new Promise((resolve) => {
      if (fullName && email && password) {
        localStorage.setItem('fullName', fullName);
        localStorage.setItem('email', email);
        this.signedUp.set(true);
        resolve({ success: true });
      } else {
        resolve({ success: false });
      }
    });
  }

  isSignedUp(): boolean {
    return this.signedUp();
  }

  selectedOption(): string {
    return this.selectedOptionSignal();
  }

  setSelectedOption(option: string) {
    localStorage.setItem('selectedOption', option);
    this.selectedOptionSignal.set(option);
  }

  async prepareSession(option: string): Promise<{ isValid: boolean }> {
    return new Promise(resolve => setTimeout(() => resolve({ isValid: true }), 500));
  }
}
