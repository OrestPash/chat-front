import { AuthGuard } from './core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./public/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    data: { name: 'Private' }
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}
