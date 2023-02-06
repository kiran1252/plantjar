import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { getDatabase, ref, child, push, update } from 'firebase/database';
import { FirbaseService } from 'src/app/firbase.service';
@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private firbaseService: FirbaseService,
    private router: Router
  ) {}
  myForm: any;
  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      rate: [null, [Validators.required]],
      number: ['', [Validators.required]],
    });
  }
  async onSubmit(form: FormGroup) {
    if (!form.valid) {
      form.markAllAsTouched();
    }
    const db1 = getDatabase();
    const newPostKey = push(child(ref(db1), 'Customer'), form.value).key;
    var data = form.value;
    data.customerId = newPostKey;
    var res = await setDoc(
      doc(this.firbaseService.db, 'Customer', '' + newPostKey),
      data
    );
    this.router.navigate(['']);
  }
}
