// angular import
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'PHAKTAI Ltd. | Admin Dashboard';

    constructor() {
        console.log('App component loaded');
    }
}
