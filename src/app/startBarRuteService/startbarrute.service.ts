import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripStartbar } from '../tripsModels/trips';

@Injectable({
  providedIn: 'root'
})
export class StartBarRuteService {
  startBarTrip:TripStartbar[] = [];
  userLng = 30;
  userLat = 30;
  money = 10;
  payment = false;

  constructor( private http: HttpClient) { }

  getStartBarInfo(){
    this.http.get('/assets/startBar.json').subscribe((data:any) => this.startBarTrip = data as TripStartbar [])
  }
}

