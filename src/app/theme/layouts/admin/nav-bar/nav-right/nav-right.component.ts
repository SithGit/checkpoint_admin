// angular import
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav-right',
    templateUrl: './nav-right.component.html',
    styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
    // public method
    constructor(private router: Router) {}

    // public method
    profile = [
        {
            icon: 'ti ti-edit-circle',
            title: 'Edit Profile'
        },
        {
            icon: 'ti ti-user',
            title: 'View Profile'
        },

        {
            icon: 'ti ti-power',
            title: 'Logout'
        }
    ];

    onLogOut() {
        // Remove token from local storage
        localStorage.removeItem('token');

        // Redirect to login page
        this.router.navigate(['/login']);
    }
}
