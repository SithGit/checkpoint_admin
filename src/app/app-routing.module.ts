// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: '/dashboard/default',
                pathMatch: 'full'
            },
            {
                path: 'dashboard/default',
                loadComponent: () => import('./pages/dashboard/dashboard.component')
            },
            {
                path: 'typography',
                loadComponent: () => import('./pages/ui-component/typography/typography.component')
            },
            {
                path: 'card',
                loadComponent: () => import('./pages/component/card/card.component')
            },
            {
                path: 'breadcrumb',
                loadComponent: () => import('./pages/component/breadcrumb/breadcrumb.component')
            },
            {
                path: 'spinner',
                loadComponent: () => import('./pages/component/spinner/spinner.component')
            },
            {
                path: 'color',
                loadComponent: () => import('./pages/ui-component/ui-color/ui-color.component')
            },
            {
                path: 'sample-page',
                loadComponent: () => import('./pages/other/sample-page/sample-page.component')
            }
        ]
    },
    {
        path: '',
        component: GuestComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/authentication/login/login.component')
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
