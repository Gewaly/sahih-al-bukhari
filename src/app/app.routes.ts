import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'hadiths/:sectionId',
    loadComponent: () =>
      import('./pages/hadith-list/hadith-list.component')
        .then(c => c.HadithListComponent)
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
