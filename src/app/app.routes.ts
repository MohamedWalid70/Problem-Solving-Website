import { Routes } from '@angular/router';
import { ProblemEditorComponent } from './Pages/problem-editor/problem-editor.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: 'problems',
    loadComponent: () =>
      import('./Pages/problems-list/problems-list.component').then(
        (m) => m.ProblemsListComponent
      ),
    title: 'Problems Set',
  },
  {
    path: 'problem-item/:id',
    loadComponent: () => import('./Pages/problem-editor/problem-editor.component').
    then(m => m.ProblemEditorComponent),
    title: 'Problem Editor',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./Pages/main-page/main-page.component').
    then(m => m.MainPageComponent),
    title: 'Main Page'
  },
  {
    path: '',
    loadComponent: () => import('./Pages/main-page/main-page.component').
    then(m => m.MainPageComponent),
    title: 'Main Page'
  },
  {
    path: 'main-page',
    loadComponent: () => import('./Pages/main-page/main-page.component').
    then(m => m.MainPageComponent),
    title: 'Main Page'
  },
  {
    path: 'signup',
    loadComponent: () => import('./Pages/signup/signup.component').
    then(m => m.SignupComponent),
    title: 'Sign Up'
  },
  {
    path: 'login',
    loadComponent: () => import('./Pages/login/login.component').
    then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: '**',
    loadComponent: () => import('./Pages/not-found/not-found.component').
    then(m => m.NotFoundComponent),
    title: 'Not Found'
  }
  ,
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },

];




 

  
