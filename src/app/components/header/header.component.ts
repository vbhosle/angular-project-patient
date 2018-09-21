import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('f') searchForm: NgForm;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSearchById(){
    let pid = +this.searchForm.form.get('patientID').value;
    this.router.navigate(['/patient', pid]);
  }

}
