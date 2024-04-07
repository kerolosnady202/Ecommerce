import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent {
  allBrands:any[]=[]
  constructor(private _HttpClient:HttpClient){}
  ngOnInit(): void {
    this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/brands').subscribe({
      next:(response:any)=>{this.allBrands = response?.data}
    })
  }

}
