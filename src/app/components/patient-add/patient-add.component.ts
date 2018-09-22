import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  @ViewChild('patientAddForm') patientAddForm: NgForm;
  
  constructor(private patientService: PatientService) { }

  ngOnInit() {
  }

  onSubmit(){
    let patient:Patient = new Patient(
                        null,
                        this.patientAddForm.form.get('name').value,
                        new Date(this.patientAddForm.form.get('dob').value),
                      );
    this.patientService.addPatient(patient);
  }

}
