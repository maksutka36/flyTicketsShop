import { Component, DoCheck, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/authService/auth-service.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  userAuthenticated = true;
  @Output() onToggle = new EventEmitter<boolean>();

  constructor(
    public authService: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.isAuth
  }

  ngDoCheck(): void {
    this.userAuthenticated = this.authService.isAuth
  }  

  logOut(){
    return this.authService.logout()
  }

  onAccountClick(){
    this.router.navigate(['/account', this.authService.username])
  }  

  toggle(){
    this.onToggle.emit(true)
  }

}
