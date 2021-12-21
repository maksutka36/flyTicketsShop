import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripsService } from '../tripService/trips.service';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.css']
})
export class SuccessAlertComponent implements OnInit {

  constructor( private router: Router, private tripService: TripsService) { }

  ngOnInit(): void {
  }

  mainPageBtn(){
    this.router.navigate(['/home']);
    this.tripService.start = false;
  }

}
