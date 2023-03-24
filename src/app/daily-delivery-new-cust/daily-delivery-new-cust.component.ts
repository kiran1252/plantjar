import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  doc,
  collection,
  getDocs,
  deleteDoc,
  setDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore/lite';
import { FirbaseService } from '../firbase.service';

@Component({
  selector: 'daily-delivery-new-cust-delivery',
  templateUrl: './daily-delivery-new-cust.component.html',
  styleUrls: ['./daily-delivery-new-cust.component.css'],
})
export class dailydeliverynewcustComponent implements OnInit {
  constructor(
    private firbaseService: FirbaseService,
    private datePipe: DatePipe, private router: Router
  ) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.filterDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
  }
  keyword = 'name';
  customerList: any = [];
  dailyEntryList: any = [];
  currentDate: any = new Date();
  filterDate: any = new Date();
  numberOfJar: any = 0;
  rate: any = 0;
  name:any =""

  saveDailyEntry() {
    if (this.numberOfJar > 0 && this.rate > 0)  {
        if (window.confirm('Are sure you want to add?')) {
          var customer = {
          customerId: new Date().valueOf(),
          name: this.name,
          address: "",
          rate: this.rate,
          number: 0,
          createdDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          externalCust:true
          }
          setDoc(
            doc(
              this.firbaseService.db,
              'Customer',
              '' + customer.customerId
            ),
            customer
          ).then(() => {
            var dailyEntryId = 'DI-' + new Date().valueOf();
            var obj = {
              dailyEntryId: dailyEntryId,
              customerId: customer.customerId,
              name: this.name,
              NoJar: this.numberOfJar,
              month: this.getCurrentMoth(this.currentDate),
              purchaseRate: this.rate,
              jarCalculatedPrice: this.numberOfJar * this.rate,
              entryDate: this.currentDate,
              entryTimestampDate: new Date(this.currentDate).getTime(),
              createddate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
              isActive: true,
            };
            setDoc(
              doc(this.firbaseService.db, 'DailyJarEntry', '' + dailyEntryId),
              obj
            ).then(() => {
              alert('Customer added successfully and daily jar entry added successfully!');
              this.router.navigate(['/home']);
            });
          });
        }
    }else
    {
      alert('please fill all details.');
    }
  }
 
  getCurrentMoth(date: any) {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const d = new Date(date);
    return month[d.getMonth()];
  }

  closeWindow() {
    this.router.navigate(['/home']);
  }

}
