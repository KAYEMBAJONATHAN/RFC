import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup';
import { authGuardGuard } from '../Servicres/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'home',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./components/home/home').then(m => m.HomeComponent)
  },
];
