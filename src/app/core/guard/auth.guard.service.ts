import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root' // Provide at the root level for application-wide access
})
export class AuthGuard {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
        // Authentication logic (replace with your actual authentication service call)
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Example using localStorage

        return isLoggedIn ? true : this.router.parseUrl('/login');
    }
}
