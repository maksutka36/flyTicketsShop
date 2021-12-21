import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../authService/auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler, ){
    const authToken = this.authService.getToken()
    const authRequest = req.clone({
      headers: req.headers.set('authorization', "Bearer " + authToken!)
    })
    return next.handle(authRequest)
  }


}
