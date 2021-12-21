import { Component, DoCheck, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { miniTrip } from '../tripsModels/trips';
import { TripsService } from '../tripService/trips.service';
import { StartBarRuteService } from '../startBarRuteService/startbarrute.service';
import { PaymentService } from '../paymentService/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit, DoCheck{

  trip: miniTrip[] = []
  result: miniTrip[] = []

  constructor(
    private http: HttpClient,
    public tripsService: TripsService,
    private ruteService: StartBarRuteService,
    private paymentSercie: PaymentService,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.http.get('/assets/trips.json').subscribe((data:any) => this.trip = data as miniTrip [])
  }

  ngDoCheck(){
    this.getRequest()
  }

  getRequest(){
    if(this.tripsService.findTickets){
      console.log(this.trip)
      this.result = this.trip.filter(  
        item => item.from == this.tripsService.from &&
        item.to == this.tripsService.to &&
        item.typeTrip == this.tripsService.typeTrip &&
        item.price <= this.tripsService.price &&
        item.date == this.tripsService.date)
      console.log(this.result)
      this.tripsService.findTickets = false
    }
  }

  onBuyClick(price: number){
    this.ruteService.money = price;
    this.ruteService.payment = true;
    this.paymentSercie.trip = this.trip
    this.paymentSercie.type = "tickets"
    this.router.navigate(['/payment'])
  }

  
  

}
