import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../authService/auth-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  constructor(
    public authService: AuthServiceService,
    private location: Location,
    private authSerivce: AuthServiceService) { }

  ngOnInit(): void {
    this.authSerivce.getHistory()
  }

  onBackClick(){
    this.location.back()
  }

}
