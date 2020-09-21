import { AuthGuard } from './../core/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

export const routes: Routes = [{
  path: '',
  component: PrivateComponent,
  canActivate: [AuthGuard],
  runGuardsAndResolvers: 'always',
  children: [
    {
      path: 'chat',
      loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PrivateRoutingModule {}
