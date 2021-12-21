import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TripsService {

  public from?:string;
  public to?:string;
  public typeTrip?:string;
  public findTickets:boolean = false;
  public price:number = 0;
  public date?:string;
  public company?:string;
  public imgCompany?:string;
  public start:boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  
}
