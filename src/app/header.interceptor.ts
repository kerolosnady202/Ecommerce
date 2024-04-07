import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (
      request.url.includes('cart') ||
      request.url.includes('orders')  ||
      request.url.includes('wishlist') /*||
      request.url.includes('addresses') ||
      request.url.includes('changeMyPassword') */
    ){

      let tokenData:any=localStorage.getItem('userToken');

      let updataReq=request.clone({
       headers:request.headers.set('token',tokenData)
      })

      return next.handle(updataReq);
    }
    return next.handle(request)
  }
}
