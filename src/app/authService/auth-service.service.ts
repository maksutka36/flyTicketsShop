import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData, LoginData } from '../authorization/auth-data-model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
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
    this.http.post('http://localhost:5000/auth/registration', authData)
      .subscribe((response) =>{
        console.log(response)
      })
  }

  login(email:string, password: string){
    const loginDate: LoginData = {email: email, password: password}
    this.http.post<{token: string, expiresIn:number, username: string}>("http://localhost:5000/auth/login", loginDate)
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
    })
  }

  autoAuthUser(){
    const authInfo = this.getAuthData();
    const now = new Date();
    const expiresIn = authInfo!.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      if(localStorage.getItem("token")){
        this.isAuth = true;
      }
      this.token = authInfo?.token;
      this.username = authInfo?.username!
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000)
    }
  }

  logout(){
    this.token = null as any;
    this.isAuth = false;
    this.authStatusListener.next(false);
    this.clearAuthData()

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
