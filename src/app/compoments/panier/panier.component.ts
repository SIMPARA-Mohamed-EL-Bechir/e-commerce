import { Component, Input, OnInit } from '@angular/core';
import { lignePanier } from '../../models/lignePanier';
import { NgFor, NgIf } from '@angular/common';
import { PanierService } from '../../services/panier.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthfirebaseService } from '../../services/authfirebase.service';
import { UserInterface } from '../../models/user.interface';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor, FormsModule, NavbarComponent, NgIf],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'], // Corrected to styleUrls
})
export class PanierComponent implements OnInit {
  @Input() detailsPanier!: lignePanier[];
  displayedColumns: string[] = ['description', 'prix', 'quantite', 'total', 'remove'];

  isAuthenticated = false;
  orderPlaced = false; 
  errorMessage: string | null = null; 


  constructor(
    private panierService: PanierService,
    private router: Router,
    private commandeService: CommandeService,
    private authService: AuthfirebaseService
  ) {}

  ngOnInit(): void {
    this.panierService.detailsPanier$.subscribe((detailsPanier) => {
      this.detailsPanier = detailsPanier;
    });

    this.authService.user$.subscribe((user: UserInterface) => {
      this.isAuthenticated = !!user; 
    });
  }

  getTotalPrice(): number {
    return this.detailsPanier.reduce((acc, item) => acc + item.qte * item.produit.price, 0);
  }

  clear(): void {
    this.panierService.clearPanier();
    this.orderPlaced = false; 
    this.errorMessage = null;
  }

  remove(productId: number): void {
    this.panierService.removeFromPanier(productId);
  }

  onOrder(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return; 
    }
    if (this.detailsPanier.length === 0) {
      alert('Votre panier est vide. Ajoutez des produits pour continuer.');
      return;
    }
    this.authService.getCurrentUserId().subscribe(async (userId) => {
      console.log('User ID:', userId); 

      if (!userId) {
        console.log('Vous devez être connecté pour valider une commande.');
        return;
      }
    const details = this.detailsPanier.map(item => ({
      produit: item.produit,
      qte: item.qte
    }));

    alert('Commande saved !!!');
  });
  
}
}