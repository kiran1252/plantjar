import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { NewCustomerComponent } from './customer/New/new-customer/new-customer.component';
import { DailyDeliveryComponent } from './daily-delivery/daily-delivery.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-cust', component: NewCustomerComponent },
  { path: 'new-cust/:id', component: NewCustomerComponent },
  { path: 'cust', component: CustomerComponent },
  { path: 'delivery', component: DailyDeliveryComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
