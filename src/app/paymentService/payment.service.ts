import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthServiceService } from '../authService/auth-service.service';
import { PostTrip } from '../payment/payment-model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  type!: string;
  trip!: any[];

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) { }

  async postHistory(){
    const username = this.authService.username
    console.log(username, this.type, this.trip)
    const postTrip: PostTrip = { username: username, type: this.type, trip: this.trip}
    this.http.post('http://localhost:5000/auth/history', postTrip)
      .subscribe((response) =>{
        console.log(response)
      } )
  }


}
