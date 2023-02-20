import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgChartsModule } from 'ng2-charts';
import { CustomerWiseBillingComponent } from './billing/customer-wise-billing/customer-wise-billing.component';
import { PeriodwiseBillingComponent } from './billing/periodwise-billing/periodwise-billing.component';
import { FilterPipe } from './filter.pipe';
import { PaymentReportComponent } from './payment/payment-report/payment-report.component';
import { PaymentComponent } from './payment/payment/payment.component';

@NgModule({
  imports: [CommonModule,FormsModule , BrowserModule, NgChartsModule, AutocompleteLibModule],
  declarations: [
    CustomerWiseBillingComponent,
    PeriodwiseBillingComponent,
    PaymentComponent,
    PaymentReportComponent,
    FilterPipe,
  ],
  providers: [DatePipe],
  exports: [
    CommonModule,
    FormsModule,
    NgChartsModule,
    DatePipe,
    BrowserModule,
    CustomerWiseBillingComponent,
    PeriodwiseBillingComponent,
    PaymentComponent,
    FilterPipe,
    PaymentReportComponent,
    AutocompleteLibModule,
  ],
})
export class SharedModule {}
