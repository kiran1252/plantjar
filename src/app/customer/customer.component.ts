import { Component, OnInit } from '@angular/core';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { FirbaseService } from '../firbase.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  constructor(private firbaseService: FirbaseService) {}
  customerList: any = [];
  async ngOnInit() {
    var colData = collection(this.firbaseService.db, 'Customer');
    const citySnapshot = await getDocs(colData);
    this.customerList = citySnapshot.docs.map((doc) => doc.data());
    console.log(this.customerList);
  }
}
