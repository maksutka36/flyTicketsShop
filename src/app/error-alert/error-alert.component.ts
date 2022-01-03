import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService } from '../tripService/trips.service';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent implements OnInit {

  constructor( private router: Router, private tripService: TripsService) { }

  ngOnInit(): void {
  }

  mainPageBtn(){
    this.router.navigate(['/home']);
    this.tripService.start = false;
  }

}
