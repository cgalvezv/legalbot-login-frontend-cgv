import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'sign_in',
    component: SignInComponent,
    pathMatch: 'full'
  },
  {
    path: 'sign_up',
    component: SignUpComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'sign_in',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
