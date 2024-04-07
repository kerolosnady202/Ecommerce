import { AbstractControl, FormGroup } from "@angular/forms";

export function validatorPass(singup:AbstractControl) : {[key :string]:boolean}|null{
  const passWord=singup.get('password')
  const rePassword=singup.get('rePassword')

/*   const passWord=singup.controls['password']
  const rePassword=singup.controls['rePassword'] */
  if (passWord?.value !== rePassword?.value && passWord?.dirty && rePassword?.dirty) {
    rePassword.setErrors({confirmPass : true})
    return {formError:true}
  }
   return null
}
