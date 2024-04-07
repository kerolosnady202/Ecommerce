import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { validatorPass } from '../validation/confirmpass.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private _authService:AuthService,private _router:Router){}
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required , Validators.minLength(3),Validators.maxLength(10)]),
    email:new FormControl(null,[Validators.required ,Validators.email , Validators.pattern(/\.com$/)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }
  ,
  {validators:validatorPass})
  isLoading:boolean=false
  apiError:string=''
  apiError2:string=''
  hidePassword = true;
  hiderePassword=true
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;

  }
  togglerePasswordVisibility(): void {
    this.hiderePassword = !this.hiderePassword;

  }
  handleRegister(registerForm:FormGroup){
    if (registerForm.valid) {
       this.isLoading=true
      this._authService.register(registerForm.value).subscribe({
        next:(request)=>{
          if (request.message === 'success') {
              this.isLoading=false
              this._router.navigate(['/login'])
          }
        },
        error:(err)=>{
          this.isLoading=false
          this.apiError=err.error.message
          /* if (err.error.errors.msg) {
            this.apiError2=err.error.errors.msg
          } */
        },
        complete:()=>console.log("complete")

      })
    }
  }
}
