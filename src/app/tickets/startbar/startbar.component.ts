import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripStartbar } from 'src/app/tripsModels/trips'
import { Router, ActivatedRoute, ParamMap  } from "@angular/router"
import { StartBarRuteService } from 'src/app/startBarRuteService/startbarrute.service';

@Component({
  selector: 'app-startbar',
  templateUrl: './startbar.component.html',
  styleUrls: ['./startbar.component.css']
})
export class StartBarComponent implements OnInit {

  constructor(
    private activeRouter: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public startBarRute: StartBarRuteService) { }

  ngOnInit(): void {
    this.startBarRute.getStartBarInfo()
  }

  onStartBarRute(nameTo: any){
    this.router.navigate(['/startbarroute', nameTo])
    this.getLocation();
  }

  getLocation(): void{

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.callApi(longitude, latitude);
        });
    } else {
       console.log("No support for geolocation")
    }
  }

  callApi(Longitude: number, Latitude: number){
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}&lat=${Latitude}`
    this.startBarRute.userLng = Longitude;
    this.startBarRute.userLat = Latitude;
  }

}
