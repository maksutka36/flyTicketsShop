import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginData } from '../authorization/auth-data-model';
import { Observable, Subject } from 'rxjs';
import { Username } from '../account/username.model';
import { host } from '../hostModel/hostModel'
import { createViewChild } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  history: any;
  errorMessage = null as any;
  username?: string;
  isAuth = false
  private token?: string;
  private authStatusListener = new Subject<boolean>()

  constructor(private http: HttpClient) { }

  getToken(){
    return this.token
  }

  getStatusListener(){
    return this.authStatusListener.asObservable()
  }

  createUser(email: string, username: string, password: string){
    const authData: AuthData = {email: email, username: username, password: password}
    console.log(authData)
    this.http.post(`${host}/auth/registration`, authData)
      .subscribe((response) =>{
        console.log(response)
        this.login(authData.email, authData.password)
      },
      (error) => {
        console.log("error", error.error.message)
        if(error.error.message == undefined){
          this.errorMessage = "Server dosen't work"
        }else{
          this.errorMessage = error.error.message;
        }
      })
  }

  login(email:string, password: string){
    const loginDate: LoginData = {email: email, password: password}
    this.http.post<{token: string, expiresIn:number, username: string}>(`${host}/auth/login`, loginDate)
    .subscribe((response) =>{
      const token = response.token;
      this.token = token;
      const username = response.username
      this.username = username
      if(token){
        this.isAuth = true;
        const expiresInDuration = response.expiresIn
        this.authStatusListener.next(true)
        this.setAuthTimer(expiresInDuration)
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, expirationDate, username)
      }
    },
    (error) => {
      console.log("error", error.error.message)
      this.errorMessage = error.error.message;
      if(error.error.message == undefined){
        this.errorMessage = "Server dosen't work"
      }else{
        this.errorMessage = error.error.message;
      }
    })
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    const now = new Date();
    if(localStorage.getItem("token")){
      const expiresIn = authInfo!.expirationDate.getTime() - now.getTime();
      if(expiresIn > 0){
        this.isAuth = true;
        this.token = authInfo?.token;
        this.username = authInfo?.username!
        this.authStatusListener.next(true);
        this.setAuthTimer(expiresIn / 1000)
      }
    }
  }

  logout(){
    this.token = null as any;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.clearAuthData()
  }

  getHistory(){
    const username: Username = {username: this.username!}
    this.http.post(`${host}/auth/getHistory`, username)
    .subscribe((res) =>{
      this.history = res
      console.log(this.history)
    })
  }

  private setAuthTimer(duration: number){
    setTimeout(() =>{this.logout()},duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, username: string){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("username", username)
  }

  private clearAuthData(){
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("username")
  }

  private getAuthData(){
    const token = localStorage.getItem("token")
    const expirationDate = localStorage.getItem("expiration")
    const username = localStorage.getItem("username")
    if( !token || !expirationDate){
      return ;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      username: username
    }
  }
}
