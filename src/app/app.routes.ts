import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./loading/loading.component').then((m) => m.LoadingComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'social-detail',
    loadComponent: () =>
      import('./social-detail/social-detail.component').then(
        (m) => m.SocialDetailComponent
      ),
  },
  {
    path: 'others',
    loadComponent: () =>
      import('./others/others.component').then((m) => m.OthersComponent),
  },
  { path: '**', redirectTo: 'login' },
];
