import { inject, Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductFirebaseService {
  firestore = inject(Firestore);
  todosCollection = collection(this.firestore, 'orders');
  constructor() { }
}
