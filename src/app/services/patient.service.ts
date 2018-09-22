import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Map<number, Patient> = new Map<number, Patient>();
  public patientsStream: Subject<Patient[]> = new Subject<Patient[]>();
  private pid_sequence: number = 6;
  private patientServiceURL = "http://localhost:9000/patients";


  constructor(private httpClient: HttpClient) {
    this.patients.set(1, new Patient(1, 'Patient 1', new Date('1985-10-10')));
    this.patients.set(2, new Patient(2, 'Patient 2', new Date('1995-09-10')));
    this.patients.set(3, new Patient(3, 'Patient 3', new Date('1980-08-10')));
    this.patients.set(4, new Patient(4, 'Patient 4', new Date('1980-07-10')));
    this.patients.set(5, new Patient(5, 'Patient 5', new Date('1995-06-10')));
    this.patients.set(6, new Patient(6, 'Patient 6', new Date('1985-05-10')));
  }

  getAllPatients():Patient[] {
    return Array.from(this.patients.values()).slice();
  }

  getPatient(patinetID: number): Patient {
    let patient:Patient = this.patients.get(patinetID);
    return patient;
  }

  addPatient(patient: Patient) {
    let newId = ++this.pid_sequence;
    if (patient) {
      this.patients.set(newId,
        new Patient(newId, patient.patientName, patient.dateOfBirth)
      );
    }

    this.patientsStream.next(Array.from(this.patients.values()).slice());
  }

  deletePatient(patientID: number){
    this.patients.delete(patientID);
    this.patientsStream.next(Array.from(this.patients.values()).slice());
  }

  deletePatients(patients: Patient[]){
    for(let patient of patients){
      this.patients.delete(patient.patientId);
    }
    this.patientsStream.next(Array.from(this.patients.values()).slice());

  }

}
