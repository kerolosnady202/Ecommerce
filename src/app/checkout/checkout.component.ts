import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private _cartservice:CartService){}
  addressform:FormGroup =new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city:new FormControl(null,[Validators.required])
  })
   navigateToPage(url:string){
    window.location.href=url
   }

  handleSubmit(addressform:FormGroup){
    this._cartservice.getLoggedUserCart().subscribe({
       next:(response:any)=>{
        this._cartservice.onlinePayment(addressform.value ,response.data._id).subscribe({
          next:(response:any)=>{
            this.navigateToPage(response.session.url)
          },
          error:(err)=>console.log(err)
         })
       }

    })

  }
}
