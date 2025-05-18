import { Routes } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: FiltersComponent }
];
