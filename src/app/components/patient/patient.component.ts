import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from '../../models/patient.model';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingWrapper } from '../../utils/loading-wrapper.util';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  private patientObservable: LoadingWrapper<Patient> = null;
  private restError: Subject<HttpErrorResponse> = new Subject<HttpErrorResponse>();
  private patientID: number;

  constructor(private patientService:PatientService,private route:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.patientID = +params['patientid'];
        // this.patientObservable = this.patientService.getPatientById(this.patientID).pipe(catchError(
        //   (error:any) => { console.log("CatchError "); console.log(error); this.restError.next(error); return of<Patient>();}
        // ));
        this.patientObservable = new LoadingWrapper<Patient>(this.patientService.getPatientById(this.patientID));
      }
    );
  }

}
