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
  }
];
