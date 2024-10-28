import { Component, EventEmitter, inject, Injectable, Input, OnInit, Output } from '@angular/core';
import { product } from '../../models/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from '../navbar/navbar.component';
import { PanierComponent } from '../panier/panier.component';
import { ProductService } from '../../services/product.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { lignePanier } from '../../models/lignePanier';


@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [ProductItemComponent,CommonModule,NavbarComponent,PanierComponent,RouterOutlet, RouterModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})


export class ListProductsComponent implements OnInit {

  detailsPanier: Array<lignePanier> = [];
  panierIsDisplayed : boolean = false;
  products !: Array<product>;
  constructor (private _productService : ProductService){}
  panierService = inject(PanierService)
  ngOnInit(): any {
    this._productService.getProducts()
    .subscribe((response :any) =>{
      this.products = response.products;
      }, (error) => {
        console.error('Error fetching products', error);  
      });

      this._productService.getProductBycategory()
      
    }

    addItem(product:product): void {
      const existingProduct = this.detailsPanier.find(item =>item.produit.id===product.id)
      if(existingProduct){
        existingProduct.qte++
      }
      else{
        const newLignePanier = new lignePanier(product, 1);
        this.detailsPanier.push(newLignePanier);
      }
      console.log(this.detailsPanier);
    }
   showPanier(e:boolean){
   this.panierIsDisplayed= e;
   }
    
    displayPanier(event:any){
      this.panierIsDisplayed = event;
      console.log("La valeur de panierIsDispalyed ",this.panierIsDisplayed);
    
    }

    onSearchByKey(event : any){
      this._productService.getProductBykey(event)
      .subscribe((response :any) =>{
        this.products = response.products;
        }, (error) => {
          console.error('Error fetching products', error);  
        });

        

  }

  addToPanier(product: product): void {
    const LignePanier = new lignePanier(product, 1);
    this.panierService.addToPanier(LignePanier);
  }
}





 


/*addItem(event : any) {
  console.log("Added Product:", event);
}*/








