import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot , Router } from '@angular/router';


export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router=inject(Router)
  if (localStorage.getItem("userToken") !== null) {
    return true
  } else {
   router.navigate(['/login'])
   return false
  }
};
