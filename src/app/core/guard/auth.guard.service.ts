import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root' // Provide at the root level for application-wide access
})
export class AuthGuard {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
        // Check if user is logged in
        if (localStorage.getItem('token')) {
            return true;
        }

        // Redirect to login page
        return this.router.createUrlTree(['/login']);
    }
}
