import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import { FirbaseService } from 'src/app/firbase.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-customer-wise-billing',
  templateUrl: './customer-wise-billing.component.html',
  styleUrls: ['./customer-wise-billing.component.css'],
})
export class CustomerWiseBillingComponent implements OnInit {
  constructor(
    private firbaseService: FirbaseService,
    public datePipe: DatePipe
  ) {}
  customerList: any = [];
  customerDailyEntryList: any = [];
  keyword = 'name';
  filterFromDate: any = new Date();
  filterToDate: any = new Date();
  currentDate: any = new Date();
  ngOnInit(): void {
    this.getCustomerList();
    this.filterFromDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.filterToDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  selectedCustomerData: any = {};
  async selectEvent(item: any) {
    this.selectedCustomerData = item;
    console.log(this.selectedCustomerData);
    this.getCustomerDailyEntryList();
  }
  async getCustomerDailyEntryList() {
    if (this.selectedCustomerData.customerId != null) {
      var colData = collection(this.firbaseService.db, 'DailyJarEntry');
      const q = query(
        colData,
        where('isActive', '==', true),
        where('customerId', '==', this.selectedCustomerData.customerId),
        where(
          'entryTimestampDate',
          '>=',
          new Date(this.filterFromDate).getTime()
        ),
        where('entryTimestampDate', '<=', new Date(this.filterToDate).getTime())
      );
      const data = await getDocs(q);
      this.customerDailyEntryList = data.docs.map((doc) => doc.data());
      this.getPaymentEntryList();
    }
  }
  dailyPaymentEntryList: any = [];
  async getPaymentEntryList() {
    this.dailyPaymentEntryList = [];
    var colData = collection(this.firbaseService.db, 'payment');
    const q = query(
      colData,
      where('isActive', '==', true),
      where('customerId', '==', this.selectedCustomerData.customerId),
      where(
        'entryTimestampDate',
        '>=',
        new Date(this.filterFromDate).getTime()
      ),
      where('entryTimestampDate', '<=', new Date(this.filterToDate).getTime())
    );
    const data = await getDocs(q);
    this.dailyPaymentEntryList = data.docs.map((doc) => doc.data());
    console.log(this.dailyPaymentEntryList);
  }

  async getCustomerList() {
    var colData = collection(this.firbaseService.db, 'Customer');
    const citySnapshot = await getDocs(colData);
    var customerList: any = citySnapshot.docs.map((doc) => doc.data());
    customerList.forEach((element: any) => {
      element['id'] = element['customerId'];
      this.customerList.push(element);
    });
  }
  getTotalJar() {
    if (this.customerDailyEntryList.length > 0) {
      return this.customerDailyEntryList.reduce(
        (partialSum: any, a: any) => partialSum + a.NoJar,
        0
      );
    }
    return 0;
  }

  getTotalPurchseJarPrice() {
    if (this.customerDailyEntryList.length > 0) {
      return this.customerDailyEntryList.reduce(
        (partialSum: any, a: any) => partialSum + a.jarCalculatedPrice,
        0
      );
    }
    return 0;
  }
  getTotalPaidPayment() {
    if (this.dailyPaymentEntryList.length > 0) {
      return this.dailyPaymentEntryList.reduce(
        (partialSum: any, a: any) => partialSum + a.amount,
        0
      );
    }
    return 0;
  }

  @ViewChild('content') content: any;

  genrateBill: boolean = false;
  async SavePDF() {
    this.genrateBill = true;
    setTimeout(() => {
      var data: any = document.getElementById('contentToConvert');
      html2canvas(data).then(async (canvas) => {
        var imgWidth = 208;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');

        const blob = await (await fetch(contentDataURL)).blob();
        const file = new File([blob], this.selectedCustomerData.name + '.png', {
          type: blob.type,
        });
        navigator
          .share({
            title: 'Water Jar Bill',
            text:
              'This bill is from date ' +
              this.filterFromDate +
              ' to ' +
              this.filterToDate +
              '. Please check.',
            files: [file],
          })
          .then(() => {
            setTimeout(() => {
              this.genrateBill = false;
            }, 2000);

            console.log('Successful share');
          })
          .catch((error) => console.log('Error sharing', error));
      });
    }, 1000);
  }

  SaveSendMonthlyBillPDF() {
    var data: any = document.getElementById('monthlyBill');
    html2canvas(data).then(async (canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      // let pdf = new jsPDF();
      // pdf.addImage(contentDataURL, 'PNG', 20, 10, imgWidth, imgHeight);
      // pdf.save(
      //   this.selectedCustomerData.name +
      //     '_' +
      //     this.filterFromDate +
      //     '_' +
      //     this.filterToDate +
      //     '.pdf'
      // );
      //  var cont =  'data:image/png;base64,' + contentDataURL;
      const blob = await (await fetch(contentDataURL)).blob();
      const file = new File([blob], 'fileName.png', { type: blob.type });
      navigator
        .share({
          title: 'Water Jar Bill',
          text:
            'This bill is from date ' +
            this.filterFromDate +
            ' to ' +
            this.filterToDate +
            '. Please check.',
          files: [file],
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    });
  }
  getFinalTotal() {
    var tAmount = this.getTotalPurchseJarPrice();
    var tPaideAmount = this.getTotalPaidPayment();
    if (tPaideAmount > 0) {
      tAmount = tAmount - tPaideAmount;
    }
    return tAmount;
  }
}
