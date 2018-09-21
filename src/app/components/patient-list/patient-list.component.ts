import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  private patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
   this.patientService.getAllPatients().subscribe(
     (patients:Patient[]) => {
       console.log(patients[0]);
       this.patients = patients;
     }
   );
  }

}
