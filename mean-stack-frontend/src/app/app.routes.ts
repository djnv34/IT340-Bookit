import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then(m => m.SignupComponent)
  },

  {
    path: 'calender',
    loadComponent: () =>
      import('./calender/calender.component').then(m => m.CalenderComponent)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then(m => m.CartComponent)
  },

  {
    path: 'manage',
    loadComponent: () =>
      import('./manage/manage.component').then(m => m.ManageComponent)
  },


  {
    path: 'profile',
    loadComponent: () =>
      import('./profile/profile.component').then(m => m.ProfileComponent)
  }
];
