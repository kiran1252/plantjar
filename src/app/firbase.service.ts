import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  collection,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite';
import { getDatabase, ref, child, push, update } from 'firebase/database';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FirbaseService {
  constructor() {}
  app: any = initializeApp(environment.firebaseConfig);
  db: any = getFirestore(this.app);
}
