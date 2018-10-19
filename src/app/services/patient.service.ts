import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { APIError } from '../models/apierror.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patients: Map<number, Patient> = new Map<number, Patient>();
  public patientsStream: Subject<Patient[]> = new Subject<Patient[]>();
  private pid_sequence: number = 6;
  private patientServiceURL = "http://localhost:8080/patient-management/patients";


  constructor(private httpClient: HttpClient) {
    // httpClient.get<Patient[]>("http://localhost:8080/patient-management/patients").subscribe(
    //     data => {
    //       data.forEach(
    //         patient => this.patients.set(patient.patientId, new Patient(patient.patientId, patient.patientName, new Date(patient.dateOfBirth)))
    //       );
    //     }
    //   );
  }

  getAllPatients():Observable<Patient[]> {
    return this.httpClient.get<Patient[]>(this.patientServiceURL)
            .pipe(
              map(
                patientList => patientList.map(
                  patient => new Patient(patient.patientId, patient.patientName, new Date(patient.dateOfBirth))
                )
              )
            );
  }

  getPatientById(patinetID: number): Observable<Patient> {
    return this.httpClient.get<Patient>(this.patientServiceURL + "/" + patinetID)
            .pipe(
              map(
                patient => new Patient(patient.patientId, patient.patientName, new Date(patient.dateOfBirth))
              )
            );
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
