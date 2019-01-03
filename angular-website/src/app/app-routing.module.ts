import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginButtonComponent } from './user-login-button/user-login-button.component';

const routes: Routes = [
  { path: '**', component: UserLoginButtonComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
