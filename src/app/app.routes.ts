import { Routes } from '@angular/router';
import { DriverDetailComponent } from './components/driver-detail/driver-detail.component';
import { DriverFormComponent } from './components/driver-form/driver-form.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';

export const routes: Routes = [
  { path: 'driver/:id', component: DriverDetailComponent },
  { path: '', component: DriverListComponent },
  { path: 'add-driver', component: DriverFormComponent },
{ path: 'edit-driver/:id', component: DriverFormComponent },
  { path: '**', redirectTo: '' }
];
