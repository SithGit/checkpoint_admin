// angular import
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterModule, FormsModule, HttpClientModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
    public loginObj: LoginCredential;
    public hasError: boolean = false;
    public onLoading: boolean = false;
    public errorMsg: string = 'Invalid username or password';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.loginObj = new LoginCredential();
    }

    onLogin(): void {
        this.hasError = false;
        this.onLoading = true;
        this.http
            .post('http://202.137.134.162:3000/api/authentication/login', this.loginObj)
            .pipe(
                catchError((error) => {
                    console.log('error ma', error);
                    this.hasError = true;
                    this.onLoading = false;
                    return of([]);
                })
            )
            .subscribe((res) => {
                if (res['token']) {
                    localStorage.setItem('token', res['token']);
                    this.onLoading = false;
                    this.router.navigate(['/dashboard']);
                }
            });
    }
}

export class LoginCredential {
    constructor(
        public username: string = '',
        public password: string = ''
    ) {}
}
