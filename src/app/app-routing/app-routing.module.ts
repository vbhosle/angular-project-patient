import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from '../components/patient-list/patient-list.component';
import { PatientAddComponent } from '../components/patient-add/patient-add.component';
import { PatientComponent } from '../components/patient/patient.component';
import { CanDeactivateGuard } from '../can-deactivate-guard.service';

const appRoutes: Routes = [
  { path: 'allpatients', component: PatientListComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'addpatient', component: PatientAddComponent },
  { path: 'patient/:patientid', component: PatientComponent },
  { path: '', redirectTo:'/allpatients', pathMatch: 'full' },
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