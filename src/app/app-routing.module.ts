import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartBarRuteComponent } from '../app/startbarrute/startbarrute.component'
import { HomeComponent } from './home/home.component';
import {AccountComponent} from './account/account.component'
import { AuthorizationComponent } from './authorization/authorization.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { ErrorAlertComponent } from './error-alert/error-alert.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'startbarroute/:name', component: StartBarRuteComponent},
  {path: 'account/:username', component: AccountComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'success', component: SuccessAlertComponent},
  {path: 'error', component: ErrorAlertComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
