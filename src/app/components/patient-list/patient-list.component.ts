import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { CanDeactivateGuard } from '../../can-deactivate-guard.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, CanDeactivateGuard {

  private patients: Patient[] = [];

  private deleteCache: Patient[] = [];
  private isUndoActive: boolean = false;
  private undoTimer = null;

  private isAsc:boolean = true;
  private sortProperty:string = 'patientId';

  constructor(private patientService: PatientService) { }

  ngOnInit() {
   this.patients = this.patientService.getAllPatients();
   this.patientService.patientsStream.subscribe(
     (patients: Patient[]) => {
       this.patients = patients;
     } 
   );
  }

  onDeletePatient(patientID: number){
    this.patientService.deletePatient(patientID);
  }

  parkForDelete(index:number){
    this.isUndoActive = true;
    clearTimeout(this.undoTimer);
    this.undoTimer = setTimeout(() => {
      this.isUndoActive = false;
      this.processDeleteCache();
    }, 5*1000);
    let patient = this.patients[index];
    this.patients.splice(index,1);
    this.deleteCache.unshift(patient);
  }

  processDeleteCache(){
    this.patientService.deletePatients(this.deleteCache);
    this.deleteCache = [];
  }

  undoDelete(){
    clearTimeout(this.undoTimer);
    this.isUndoActive = false;
    this.patients = this.patients.concat(this.deleteCache);
    this.deleteCache = [];
  }

  setSortProperty(prop:string){
    if(this.sortProperty === prop){
      this.isAsc = !this.isAsc;
    }
    else{
      this.isAsc = true;
      this.sortProperty = prop;
    }
  
  }

  canDeactivate(){
    if(this.isUndoActive){
      let response = confirm("You can't undo if you leave the page. Do you still want to proceed?");
      if(response){
        this.processDeleteCache();
      }
      return response;
    }
    return true;
  }

}
