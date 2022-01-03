import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostBinding, OnDestroy, DoCheck } from '@angular/core';
import { state, style, transition, animate, trigger, keyframes} from '@angular/animations';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../authService/auth-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  animations:[trigger('isOpen',[
    state('false', style({
      'visibility': 'hidden'
    })),
    state('true', style({
      'visibility': 'visible'
    })),
    transition('* => true', animate('0.8s',keyframes([
      style({ opacity: 0, visibility: 'visible', offset: 0 }),
      style({ opacity: 1, visibility: 'visible', offset: 0.8 }),
    ]))),
    transition('true => false', animate('0.8s',keyframes([
      style({ opacity: 1, visibility: 'visible', offset: 0 }),
      style({ opacity: 0, visibility: 'hidden', offset: 0.8 }),
    ])))
  ])
]
})
export class AuthorizationComponent implements OnInit, OnDestroy, DoCheck {

  private authListenerSub?: Subscription;
  userAuthenticated = false;
  myForm : FormGroup;
  isOpen = true;
  authorization = true;
  registerBtn = true;

  constructor(
    private http:HttpClient,
    public authService: AuthServiceService,
    private router: Router){
      this.myForm = new FormGroup({
              
        "username": new FormControl("", Validators.required),
        "email": new FormControl("",[
          Validators.required,
          Validators.email
        ]),
        "password": new FormControl("",[
          Validators.required,
          Validators.minLength(4)
        ]),
        "logEmail": new FormControl(""),
        "logPassword": new FormControl("")
        
    });
  }

  ngOnInit() {
    if(this.authService.isAuth){
      this.authService.autoAuthUser()
    }
    this.authListenerSub = this.authService.getStatusListener()
    .subscribe(isAuthorizated =>{
      this.userAuthenticated = isAuthorizated
    })
    this.userAuthenticated = this.authService.isAuth
  }

  ngOnDestroy(): void {
      this.authListenerSub?.unsubscribe
  }

  ngDoCheck(): void {
    if(this.userAuthenticated){
      this.isOpen = false
    }
  }
   
  onSubmit(){
    if(this.registerBtn){
      this.authService.createUser(this.myForm.value.email, this.myForm.value.username, this.myForm.value.password,)
    }else{
      this.authService.login(this.myForm.value.logEmail, this.myForm.value.logPassword)
    }
  }
  
  onToggle(){
    this.isOpen = !this.isOpen
  }

  onRegister(change: boolean){
    this.registerBtn = change
  }

  clearErrorMessage(){
    this.authService.errorMessage = null as any;
  }


}
