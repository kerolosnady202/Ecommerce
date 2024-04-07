import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _authService:AuthService,private _router:Router){}
  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required ,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
  })
  isLoading:boolean=false
  apiError:string=''
  hidePassword:boolean=true
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
    
  }
  handleLogin(registerForm:FormGroup){
    if (registerForm.valid) {
       this.isLoading=true
      this._authService.login(registerForm.value).subscribe({
        next:(resposne)=>{
          if (resposne.message === 'success') {
              localStorage.setItem("userToken",resposne.token)
              this._authService.decodeUserData()
              this.isLoading=false
              this._router.navigate(['/home'])
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
