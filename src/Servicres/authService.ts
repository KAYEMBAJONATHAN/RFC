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

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signup(dto: { username: string; email: string; password: string }) {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/signup`,
      dto
    );
  }

  login(dto: { username: string; email: string; password: string }) {
    return this.http.post<{ token: string; message: string }>(
      `${this.baseUrl}/login`,
      dto
    );
  }

  // ✅ Token management
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

  // ✅ Signup state (optional)
  isSignedUp(): boolean {
    return this.signedUp();
  }

  // ✅ Option selection (e.g., role, mode)
  selectedOption(): string {
    return this.selectedOptionSignal();
  }

  setSelectedOption(option: string) {
    localStorage.setItem('selectedOption', option);
    this.selectedOptionSignal.set(option);
  }

  // ✅ Simulated session prep
  async prepareSession(option: string): Promise<{ isValid: boolean }> {
    return new Promise(resolve => setTimeout(() => resolve({ isValid: true }), 500));
  }
}
