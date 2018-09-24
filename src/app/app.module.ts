import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientAddComponent } from './components/patient-add/patient-add.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PatientService } from './services/patient.service';
import { HttpClientModule } from '@angular/common/http';
import { SortPipe } from './pipes/sort.pipe';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { FormActivateGuard } from './services/form-activate-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientListComponent,
    PatientAddComponent,
    HeaderComponent,
    SortPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    AngularDraggableModule,
    AppRoutingModule
  ],
  providers: [
    PatientService,
    CanDeactivateGuard,
    FormActivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
