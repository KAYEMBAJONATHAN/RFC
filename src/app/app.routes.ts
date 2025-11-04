import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup';
import { authGuardGuard } from '../Servicres/auth-guard-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    canActivate: [authGuardGuard],
    loadComponent: () =>
      import('./components/home/home').then(m => m.HomeComponent)
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
    path: 'about',
    loadComponent: () =>
      import('./components/about/about').then(m => m.AboutComponent)
  },
  {
    path: 'ministries',
    loadComponent: () =>
      import('./components/ministries/ministries').then(m => m.MinistriesComponent)
  },
  {
    path: 'events',
    loadComponent: () =>
      import('./components/events/events').then(m => m.EventsComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: 'footer',
    loadComponent: () =>
      import('./components/footer/footer').then(m => m.FooterComponent)
  },
  {
    path: 'message-request',
    loadComponent: () =>
      import('./components/message-request/message-request').then(m => m.MessageRequestComponent)
  }
];
