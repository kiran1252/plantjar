import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './customer/customer.component';
import { NewCustomerComponent } from './customer/New/new-customer/new-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { DailyDeliveryComponent } from './daily-delivery/daily-delivery.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.gaurd';
import { SharedModule } from './shared.module';
@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    NewCustomerComponent,
    HomeComponent,
    DailyDeliveryComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,SharedModule
  ],
  providers: [ AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
