import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './authorization/header/header.component';
import { SideBarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FromToComponent } from './sidebar/fromto/fromto.component';
import { MatInputModule} from '@angular/material/input'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { TripsService } from './tripService/trips.service';
import { TicketsComponent } from './tickets/tickets.component';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { StartBarComponent } from './tickets/startbar/startbar.component';
import { StartBarRuteComponent } from './startbarrute/startbarrute.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './startbarrute/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { PaymentComponent } from './payment/payment.component';
import { AuthorizationComponent } from './authorization/authorization.component'
import { AuthInterceptorService } from './authorization/auth-interceptor.service';
import { AccountComponent } from './account/account.component';
import { NgxStripeModule } from 'ngx-stripe';
import { SuccessAlertComponent } from './success-alert/success-alert.component'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    FromToComponent,
    TicketsComponent,
    StartBarComponent,
    StartBarRuteComponent,
    HomeComponent,
    MapComponent,
    PaymentComponent,
    AuthorizationComponent,
    AccountComponent,
    SuccessAlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DatePickerModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyBhjTSrKhaSwpigKm71mR8ITTen72b5vf8'
    }),
    NgxStripeModule.forRoot('pk_test_51K07pEHQh1NfXvkTW69ZFV9AnJB1xK9TEufLXxEangyHH5tCZZnASfh9mQRoxknxVDonZPb31gD4HA2xQEn5LSD000Ymj1MhZN')



  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}, TripsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
