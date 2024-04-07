import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { WishService } from '../wish.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLogin:boolean=false
  constructor(private _authService:AuthService ,private _cartsservice:CartService , private _wish:WishService){
    this._authService.userData.subscribe({
      next:()=>{
        if (this._authService.userData.getValue()!==null) {
            this.isLogin=true
          } else {
            this.isLogin=false
        }
      }
    })

  }
  cartItemNum:number=0
  wishItemNum:number=0
  ngOnInit(): void {
   this._cartsservice.Numofcart.subscribe({
    next:(value)=>{this.cartItemNum =value }
   })
   this._wish.wishNum.subscribe({
    next:(value)=>{this.wishItemNum =value }
   })

  }
  logOut(){
    this._authService.logOut()
  }

}
