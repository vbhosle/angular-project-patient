import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from '../components/patient-list/patient-list.component';
import { PatientAddComponent } from '../components/patient-add/patient-add.component';
import { PatientComponent } from '../components/patient/patient.component';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';
import { FormActivateGuard } from '../services/form-activate-guard.service';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const appRoutes: Routes = [
  { path: 'allpatients', component: PatientListComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'addpatient', component: PatientAddComponent, canActivate: [FormActivateGuard] },
  { path: 'patient/:patientid', component: PatientComponent },
  { path: '', redirectTo:'/allpatients', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
 exports: [
   RouterModule
 ]
})
export class AppRoutingModule { }