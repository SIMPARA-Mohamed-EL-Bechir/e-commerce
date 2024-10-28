import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';
import { product } from '../../models/product';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [NgStyle,NgIf],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() produit !: product;
  @Output() selectedProduct = new EventEmitter<product>();
  constructor(private router: Router) {}
  addToPanier(){
    this.selectedProduct.emit(this.produit);
  }

  getState(){
    return this.produit.stock > 0 ? "En stock" : "En rupture de stock";

  }


  getColor(){
    return this.produit.stock > 0 ? "green" : "red";

  }

  onImageClick(productId: number) {
    this.router.navigate(['/details', productId]);
    console.log("Cliqué sur l'image de id " + productId)
  }


}
