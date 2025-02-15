import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent: ()=> import('./grid/grid.component').then(mod => mod.GridComponent)},
    {path: 'login', loadComponent: ()=> import('./login-form/login-form.component').then(mod => mod.LoginFormComponent)},
    {path: 'about', loadComponent: ()=> import('./about/about.component').then(mod => mod.AboutComponent)},
    {path: 'cards', loadComponent: ()=> import('./card/card.component').then(mod => mod.CardComponent)},
];
