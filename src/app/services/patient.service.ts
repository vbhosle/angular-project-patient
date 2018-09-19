import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patients: Patient[];

  constructor() { }

  getAllPatients(): Patient[]{
    return this.patients.slice();
  }

  addPatient(patient: Patient){
    if(patient){
      this.patients.push(
        {
          patientId: patient.patientId,
          patientName: patient.patientName,
          dateOfBirth: patient.dateOfBirth,
          age: patient.age
        }
      );
    }
  }

  deletePatient(patientID: number){
    let index = this.patients.findIndex(
      (patient) => patient.patientId === patientID
    );

    if(index!=-1){
      this.patients.splice(index, 1);
    }
  }
}
