import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private authService: AuthService
) {}

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
        // authorised so return true
        return true;
    }

    // not logged in so redirect to login page
    this.router.navigateByUrl('/login');
    return false;
}
}
