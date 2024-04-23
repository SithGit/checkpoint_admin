import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HorizontalModule } from './horizontal/horizontal.module';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';

@NgModule({
    declarations: [LayoutContainerComponent, PublicLayoutComponent],
    imports: [CommonModule, RouterModule, SharedModule, HorizontalModule],
    exports: [LayoutContainerComponent, PublicLayoutComponent],
})
export class LayoutModule {}
