import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private patient: Patient = null;
  private patientID: number;
  private statusText: string;

  constructor(private patientService:PatientService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.patient = null;
        this.statusText = 'loading';
        this.patientID = +params['patientid'];
        this.patientService.getPatient(this.patientID).subscribe(
          (patient: Patient) => { this.patient = patient; this.statusText = null; } ,
          (error) => this.statusText = error
        );
      }
    );
  }

}
