import { Injectable } from '@angular/core';
import { TripStartbar } from '../tripsModels/trips';

@Injectable({
  providedIn: 'root'
})
export class StartBarRuteService {
  startBarTrip?:TripStartbar[];
  userLng = 30;
  userLat = 30;
  money = 10;
  payment = false;


  constructor() { }
}

