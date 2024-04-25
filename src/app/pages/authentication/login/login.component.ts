// angular import
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
    constructor(private readonly router: Router) {}
    // public method
    SignInOptions = [
        {
            image: 'assets/images/authentication/google.svg',
            name: 'Google'
        },
        {
            image: 'assets/images/authentication/twitter.svg',
            name: 'Twitter'
        },
        {
            image: 'assets/images/authentication/facebook.svg',
            name: 'Facebook'
        }
    ];

    login() {
        console.log('Login Clicked');
        this.router.navigate(['dashboard/default']);
    }
}
