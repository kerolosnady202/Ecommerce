import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private _cartservice:CartService ,private _toastr:ToastrService , private _spinner:NgxSpinnerService){}
  cartNum:any=this._cartservice.Numofcart
  cartDetails:any=null
  errmeg:boolean=false
  ngOnInit(): void {
    this._cartservice.getLoggedUserCart().subscribe({
      next:(response)=>{

        this.cartDetails = response.data
      },
      error:(err)=>console.log(err)

    })
  }
  removeCartItem(prodId:string){
    this._cartservice.removeCartItem(prodId).subscribe({
      next:(response)=>{
        console.log(response)
        this.cartDetails = response.data;
        this._cartservice.Numofcart.next(response.numOfCartItems)
        /* console.log(response) */
       if (response.status == 'success') {
          this._toastr.info('Item Remove Form Cart','',{
            timeOut:1000,
            progressBar:true,
           progressAnimation:"increasing",
          })
       }
      },
      error:(err)=>{
        console.log(err)
        this.errmeg=true
      }
    })
  }
  updataItemCount(prodId:string,count:number){
    this._cartservice.updataItemCount(prodId,count).subscribe({
      next:(response)=>{this.cartDetails = response.data;
        for (let index = 0; index < this.cartDetails?.products.length; index++) {
          if (this.cartDetails.products[index].count == 0) {
             this.removeCartItem(this.cartDetails.products[index].product._id)
          }

        }
      },
      error:(err)=>console.log(err)
    })
  }

}
