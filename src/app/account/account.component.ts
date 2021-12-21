import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../authService/auth-service.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Username } from './username.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  history: any;

  constructor(
    public authService: AuthServiceService,
    private location: Location,
    private http: HttpClient,
    private authSerivce: AuthServiceService) { }

  ngOnInit(): void {
    const username: Username = {username: this.authService.username!}
    this.http.post('http://localhost:5000/auth/getHistory', username)
      .subscribe((res) =>{
        this.history = res
        console.log(this.history)
      })
  }

  onBackClick(){
    this.location.back()
  }

}
