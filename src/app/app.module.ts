import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    PatientListComponent,
    PatientAddComponent,
    HeaderComponent,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    PatientService,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
