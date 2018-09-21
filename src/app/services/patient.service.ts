import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Map<number,Patient> = new Map<number, Patient>();
  private pid_sequence: number =1;
  private patientServiceURL = "http://localhost:9000/patients";


  constructor(private httpClient: HttpClient) { 
    this.patients.set(1,new Patient(1, 'Patient 1', new Date('1985-10-10')));
    this.patients.set(2,new Patient(2, 'Patient 2', new Date('1995-10-15')));
    this.patients.set(3,new Patient(3, 'Patient 3', new Date('1980-01-10')));
    this.patients.set(4,new Patient(4, 'Patient 4', new Date('1980-10-10')));
    this.patients.set(5,new Patient(5, 'Patient 5', new Date('1995-10-10')));
    this.patients.set(6,new Patient(6, 'Patient 6', new Date('1985-10-10')));
      // new Patient(this.pid_sequence++, 'Patient 1', new Date('1985-10-10')),
      // new Patient(this.pid_sequence++, 'Patient 2', new Date('1995-10-15')),
      // new Patient(this.pid_sequence++, 'Patient 3', new Date('1980-01-10')),
      // new Patient(this.pid_sequence++, 'Patient 4', new Date('1980-10-10')),
      // new Patient(this.pid_sequence++, 'Patient 5', new Date('1995-10-10')),
      // new Patient(this.pid_sequence++, 'Patient 6', new Date('1985-10-10')),
    //];
  }

  getAllPatients(): Observable<Patient[]>{
    // return  Observable.create(observer => { setTimeout(() => {
    //   observer.next(this.patients); },1500);
    // });
    this.patients.clear();
    return this.httpClient.get<Patient[]>(this.patientServiceURL).pipe(
      map(
        (patients: Patient[]) => {
          //this.patients = [];
          for(let i = 0; i<patients.length;i++){
            this.patients.set(patients[i].patientId,new Patient(patients[i].patientId, patients[i].patientName,new Date(patients[i].dateOfBirth)));
          }
          return Array.from(this.patients.values());
        }
      )
    );
  }

  getPatient(patinetID: number): Observable<Patient>{
    return this.httpClient.get<Patient>(this.patientServiceURL+"/"+patinetID).pipe(
      map(
        (patient: Patient) => {
         let patientObj = new Patient(patient.patientId, patient.patientName,new Date(patient.dateOfBirth));
         return patientObj;
        }
      ));
  }

  // addPatient(patient: Patient){
  //   if(patient){
  //     this.patients.push(
  //       new Patient(this.pid_sequence++, patient.patientName, patient.dateOfBirth)
  //     );
  //   }
  // }

  // deletePatient(patientID: number){
  //   let index = this.patients.findIndex(
  //     (patient) => patient.patientId === patientID
  //   );

  //   if(index!=-1){
  //     this.patients.splice(index, 1);
  //   }
  // }

}
