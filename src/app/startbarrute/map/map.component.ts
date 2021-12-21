import { Component, OnInit} from '@angular/core';
import { StartBarRuteService } from 'src/app/startBarRuteService/startbarrute.service';
import { state, style, transition, animate, trigger, keyframes} from '@angular/animations';
import { Airports } from 'src/app/tripsModels/trips';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  animations:[trigger('isOpen',[
    state('false', style({
      'visibility': 'hidden'
    })),
    state('true', style({
      'visibility': 'visible'
    })),
    transition('* => true', animate('0.8s',keyframes([
      style({ opacity: 0, visibility: 'visible',transform:'translateX(-100px)', offset: 0 }),
      style({ opacity: 1, visibility: 'visible',transform:'translateX(0)', offset: 0.8 }),
    ]))),
    transition('true => false', animate('0.8s',keyframes([
      style({ opacity: 1, visibility: 'visible',transform:'translateX(0)', offset: 0 }),
      style({ opacity: 0, visibility: 'hidden',transform:'translateX(100px)', offset: 0.8 }),
    ])))
  ])
]

})
export class MapComponent implements OnInit {

  isOpen = false;
  longitude = 30;
  latitude = 30;
  allMarkers?:Airports[];
  markers?:Airports[];
  name?: string;

  constructor(
    private startBarRute: StartBarRuteService,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get('/assets/startBarAirport.json').subscribe((data) => this.allMarkers = data as Airports[])
    this.name = this.route.snapshot.params['name'];
  }

 onMapClick(){
  this.markers = this.allMarkers?.filter((item) => item.nameTrip == this.name)
  this.latitude = this.startBarRute.userLat;
  this.longitude = this.startBarRute.userLng;
  this.isOpen = !this.isOpen
 }

 


}
