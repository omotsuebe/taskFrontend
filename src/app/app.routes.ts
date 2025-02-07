import { Routes } from '@angular/router';
import {AuthGuard} from "./auth/guard/auth.guard";

export const routes: Routes = [
  {path: '', loadComponent: () =>import('./home/home.component').then(mod=>mod.HomeComponent)},
  {path: 'login', loadComponent: () =>import('./auth/login/login.component').then(mod=>mod.LoginComponent)},
  {path: 'register', loadComponent: () =>import('./auth/register/register.component').then(mod=>mod.RegisterComponent)},
  {path: 'dashboard', canActivate: [AuthGuard], loadComponent: () =>import('./dashboard/dashboard.component').then(mod=>mod.DashboardComponent)},
  { path: '**', redirectTo: '' },
];
