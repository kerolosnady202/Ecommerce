import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable ,BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData=new BehaviorSubject(null);

  constructor(private _HttpClient:HttpClient,private _router:Router) {
    if (localStorage.getItem("userToken") !== null) {
        this.decodeUserData()
    }
   }

  decodeUserData(){
     let encodeToken=JSON.stringify(localStorage.getItem("userToken"))
     let decodeToken:any=jwtDecode(encodeToken)
     this.userData.next(decodeToken)
  }

  logOut(){
    localStorage.removeItem("userToken")
    this.userData.next(null)
    this._router.navigate(["/login"])
  }
  register(userdata:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signup",userdata)
   }

  login(userdata:object):Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/auth/signin",userdata)
   }
}
