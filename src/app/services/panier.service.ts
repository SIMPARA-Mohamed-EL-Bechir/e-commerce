import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { lignePanier } from '../models/lignePanier';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private detailsPanierSubject = new BehaviorSubject<lignePanier[]>([]);
  detailsPanier$ = this.detailsPanierSubject.asObservable();

  addToPanier(lignePanier: lignePanier): void {
    const currentPanier = this.detailsPanierSubject.value;
    const existingProduct = currentPanier.find(item => item.produit.id === lignePanier.produit.id);

    if (existingProduct) {
      existingProduct.qte += lignePanier.qte;
    } else {
      currentPanier.push(lignePanier);
    }

    this.detailsPanierSubject.next(currentPanier);
  }

  removeFromPanier(productId: number): void {
    const currentPanier = this.detailsPanierSubject.value.filter(item => item.produit.id !== productId);
    this.detailsPanierSubject.next(currentPanier);
  }

  clearPanier(): void {
    this.detailsPanierSubject.next([]);
  }
}