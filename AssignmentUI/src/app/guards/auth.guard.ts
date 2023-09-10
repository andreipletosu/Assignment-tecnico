import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterLink, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
    
    const router = new Router();
    const auth = inject(AuthService);
    if(auth.isLoggedIn()){
      return true;
    }else{
      router.navigate(['login'])
      alert("Please Login!")
      return false
    }
};
