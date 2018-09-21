import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Map<number, Patient> = new Map<number, Patient>();
  private pid_sequence: number = 6;
  private patientServiceURL = "http://localhost:9000/patients";


  constructor(private httpClient: HttpClient) {
    this.patients.set(1, new Patient(1, 'Patient 1', new Date('1985-10-10')));
    this.patients.set(2, new Patient(2, 'Patient 2', new Date('1995-10-15')));
    this.patients.set(3, new Patient(3, 'Patient 3', new Date('1980-01-10')));
    this.patients.set(4, new Patient(4, 'Patient 4', new Date('1980-10-10')));
    this.patients.set(5, new Patient(5, 'Patient 5', new Date('1995-10-10')));
    this.patients.set(6, new Patient(6, 'Patient 6', new Date('1985-10-10')));
  }

  getAllPatients(): Observable<Patient[]> {
    return Observable.create(observer => {
      setTimeout(() => {
        observer.next(Array.from(this.patients.values()).slice());
      }, 1500);
    });
  }

  getPatient(patinetID: number): Observable<Patient> {
    return Observable.create( (observer:Observer<Patient>) => {
      setTimeout(() => {
        let isRandomError: boolean = ( Math.floor(Math.random() * 10) + 1) == 5;
        if(isRandomError){
          observer.error("Some error on server side");
        }
       else{
         let patient:Patient = this.patients.get(patinetID);
         if(!patient){
           observer.error("Patient not found");
         }
         observer.next(this.patients.get(patinetID));
       }
      }, 1500);
    });
  }

  addPatient(patient: Patient) {
    let newId = ++this.pid_sequence;
    if (patient) {
      this.patients.set(newId,
        new Patient(newId, patient.patientName, patient.dateOfBirth)
      );
    }
  }

  deletePatient(patientID: number){
    return Observable.create(observer => {
      setTimeout(() => {
        this.patients.delete(patientID);
        observer.next(Array.from(this.patients.values()).slice());
      }, 1500);
    });
  }

}
