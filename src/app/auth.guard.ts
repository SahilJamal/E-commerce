import { CanActivateFn , Router , ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { isSellerLoggedIn } from './utils/session';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router:Router = inject(Router);
  const protectedRoutes: string[] = ['/seller-home','/seller-add-product'];  
  if(localStorage.getItem('seller')){
     return true;
  }
  return protectedRoutes.includes(state.url) && !isSellerLoggedIn.value ? router.navigate(['/']):true;
};
