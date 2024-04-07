import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.css']
})
export class AllorderComponent {
  constructor(private _auth:AuthService ,private _cartservic:CartService){

  }
  userId:number=0
  allorder:any
  ngOnInit(): void {
    this._auth.userData.subscribe({
      next:(response:any)=>this.userId =  response.id
    })
    this._cartservic.getAllorder(this.userId).subscribe({
      next:(response:any)=> { this.allorder = response
       console.log(response)
      }
    })
  }


}
