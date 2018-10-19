import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { CanDeactivateGuard } from '../../can-deactivate-guard.service';
import { Observable, of, Subject, combineLatest } from 'rxjs';
import { catchError, map, combineAll } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { andObservables } from '../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.1.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, CanDeactivateGuard {

  private patients: Patient[] = [];
  private patientsObservable: Observable<Patient[]>;
  private restError: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();

  private deleteCache: Patient[] = [];
  private isUndoActive: boolean = false;
  private undoTimer = null;

  private isAsc: boolean = true;
  private sortProperty: string = 'patientId';

  constructor(private patientService: PatientService, private flashMessageService: FlashMessagesService) { }

  ngOnInit() {
    this.patientsObservable = this.patientService.getAllPatients().pipe(catchError(
      (error:HttpErrorResponse) => { console.log("CatchError "+error); this.restError.next(error); return of<Patient[]>();}
    ));
    this.patientService.getAllPatients().subscribe(
      (patients: Patient[]) => {
        patients.forEach(
          patient => this.patients.push(new Patient(patient.patientId, patient.patientName, new Date(patient.dateOfBirth)))
        );
      }
    );
  }

  refreshPatientList(){
    console.log("refreshing..");
    this.deleteCache = [];
    this.patientsObservable = this.patientService.getAllPatients().pipe(catchError(
      (error:HttpErrorResponse) => { console.log("CatchError "+error); this.restError.next(error); return of<Patient[]>();}
    ));
    
  }

  parkForDelete(patient:Patient) {
    this.isUndoActive = true;
    clearTimeout(this.undoTimer);
    this.undoTimer = setTimeout(() => {
      this.isUndoActive = false;
      this.processDeleteCache();
    }, 5 * 1000);
    this.deleteCache.unshift(patient);
  }

  processDeleteCache() {
    // let deletePatientsCount = this.deleteCache.length;
    let deleteObservables:Observable<Patient>[] = [];
    for(let i=0; i<this.deleteCache.length; i++){
      deleteObservables.push(this.patientService.deletePatient(new Patient(this.deleteCache[i].patientId, this.deleteCache[i].patientName, null)));
    }

    combineLatest(deleteObservables).subscribe(
      () => {console.log("done")},
      (error) => { console.log("error")},
      () => this.refreshPatientList
    );
  }

  undoDelete() {
    clearTimeout(this.undoTimer);
    this.isUndoActive = false;
    this.refreshPatientList();
  }

  setSortProperty(prop: string) {
    if (this.sortProperty === prop) {
      this.isAsc = !this.isAsc;
    }
    else {
      this.isAsc = true;
      this.sortProperty = prop;
    }

  }

  canDeactivate() {
    if (this.isUndoActive) {
      return confirm("You can not undo if you leave the page. Do you still want to proceed?");
    }
    return true;
  }

}
