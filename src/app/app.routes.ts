import { Routes } from '@angular/router';
import { ProblemEditorComponent } from './Pages/problem-editor/problem-editor.component';
import { dashboardAuthGuard } from './guards/DashboardGuard/dashboard-auth.guard';
import { historyAuthGuard } from './guards/HistoryGuard/history-auth.guard';


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
    loadComponent: () => import('./Pages/login/login.component').
    then(m => m.LoginComponent),
    title: 'Login'
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
  { path: 'dashboard', 
    loadComponent: () => import('./Pages/dashboard/dashboard.component').
    then(m => m.DashboardComponent),
    title: 'Dashboard',
    canActivate: [dashboardAuthGuard]
  },
  {
    path: 'admin-login',
    loadComponent: () => import('./Pages/admin-login/admin-login.component').then(m => m.AdminLoginComponent),
    title: 'Admin Login',
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadComponent: () => import('./Pages/about/about.component').
    then(m => m.AboutComponent),
    title: 'About Us'
  },
  {
    path: 'history',
    loadComponent: () => import('./Pages/submissions/submissions.component').
    then(m => m.SubmissionsComponent),
    title: 'History',
    canActivate: [historyAuthGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./Pages/not-found/not-found.component').
    then(m => m.NotFoundComponent),
    title: 'Not Found'
  },
];




 

  
