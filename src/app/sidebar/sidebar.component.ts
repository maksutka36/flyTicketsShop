import { Component, OnInit, ViewChild } from '@angular/core';
import { FromToComponent } from './fromto/fromto.component';
import { TripsService } from '../tripService/trips.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SideBarComponent implements OnInit {
  value:number = 500;
  date?:string;



  @ViewChild(FromToComponent, {static: false})
  private fromToComponent: FromToComponent|undefined;


  constructor(private tripsService: TripsService){

  }
 
  ngOnInit() {

  }

  typeTrip(data: string){
    console.log(data)
    this.tripsService.typeTrip = data
  }


  onSearch(){
    this.tripsService.from = this.fromToComponent?.fromControl.value
    this.tripsService.to = this.fromToComponent?.toControl.value
    this.tripsService.price = this.value
    console.log(this.date)
    this.tripsService.findTickets = true
    this.tripsService.date = this.date
    this.tripsService.start = true
  }




}
