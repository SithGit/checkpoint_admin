// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import

import { SpinnerComponent } from './components/spinner/spinner.component';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule, NgScrollbarModule],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpinnerComponent,
        NgbModule,
        NgbDropdownModule,
        NgbNavModule,
        NgbCollapseModule,
        NgScrollbarModule
    ],
    declarations: [SpinnerComponent]
})
export class SharedModule {}
