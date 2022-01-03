import { Component, OnInit, NgModule } from '@angular/core';
import { StartBarRuteService } from '../startBarRuteService/startbarrute.service';
import { HttpClient } from '@angular/common/http';
import { TripStartbar, Airports } from '../tripsModels/trips';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PaymentService } from '../paymentService/payment.service';

@Component({
  selector: 'app-startbarrute',
  templateUrl: './startbarrute.component.html',
  styleUrls: ['./startbarrute.component.css']
})
export class StartBarRuteComponent implements OnInit {

  startBarItem: TripStartbar[] = []
  startBarResult: TripStartbar[] = []
  startBarAirport: Airports[] = []
  nameAirport: Airports[] = []
  array: any[] = []
  myControl = new FormControl();
  filteredOptions?: Observable<string[]>;
  buyState?: boolean;
  btnTouched = false;
  name?: string;

  constructor(
    private startBarRute: StartBarRuteService,
    private http: HttpClient,
    private ruteService: StartBarRuteService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.http.get('/assets/startBar.json').subscribe((data:any) => this.startBarItem = data as TripStartbar[] );
    this.http.get('/assets/startBarAirport.json').subscribe((data:any) => this.startBarAirport = data as Airports[] );
    this.name = this.route.snapshot.params['name'];
    this.startBarResult = this.startBarItem.filter( item => item.to == this.name);
    this.nameAirport = this.startBarAirport.filter( item => item.nameTrip == this.name);
    this.filter(this.nameAirport)
    this.startBarRute.startBarTrip = this.startBarResult    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.array.filter(option => option.toLowerCase().includes(filterValue));
  }


  filter(item: Airports[]){
    for(let i = 0; i < item.length; i++){
      this.array.push(item[i].title)
    }
  }

  onBuyClick(){
    this.btnTouched = true;
    for(let i = 0; i < this.array.length; i++){
      if(this.myControl.value == this.array[i]){
        this.buyState = true;
        this.router.navigate(['/payment'])
        break;
      }else{
        this.buyState = false;
      }
    }
    this.paymentService.type = "startbar tickets"
    this.paymentService.trip = this.startBarResult
  }

  payment(){
    if(this.buyState == true){
      this.ruteService.payment = true;
      for(const item of this.startBarResult)
      this.ruteService.money = item.price
    }
  }



}
