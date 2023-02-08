import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { collection, getDocs,query,where  } from 'firebase/firestore/lite';
import { FirbaseService } from '../firbase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private firbaseService: FirbaseService,  private datePipe: DatePipe) { }
  totalCustomer:any = 0;
  totalTodaysJar:any = 0;
  dailyEntryList: any = [];
  filterDate: any = new Date();
  ngOnInit(): void {
    this.getCustomerList();
    this.filterDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getDailyEntryList()
  }

  async getCustomerList() {
    var colData = collection(this.firbaseService.db, 'Customer');
    const citySnapshot = await getDocs(colData);
    var customerList: any = citySnapshot.docs.map((doc) => doc.data());
    this.totalCustomer = customerList.length;
  }

  async getDailyEntryList() {
    var colData = collection(this.firbaseService.db, 'DailyJarEntry');
    const q = query(colData, where("isActive", "==", true),where("entryDate", "==", this.filterDate));
    const data = await getDocs(q);
    this.dailyEntryList = data.docs.map((doc) => doc.data());
    this.totalTodaysJar = this.dailyEntryList.reduce((partialSum:any, a:any) => partialSum + a.NoJar, 0);
  }

}
