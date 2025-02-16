import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: ()=> import('./grid/grid.component').then(mod => mod.GridComponent)},
    {path: 'login', loadComponent: ()=> import('./signup-form/signup-form.component').then(mod => mod.SignupFormComponent)},
    {path: 'about', loadComponent: ()=> import('./about/about.component').then(mod => mod.AboutComponent)},
    {path: 'cards', loadComponent: ()=> import('./card/card.component').then(mod => mod.CardComponent)},
];
