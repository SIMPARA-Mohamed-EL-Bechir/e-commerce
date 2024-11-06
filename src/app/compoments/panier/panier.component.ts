import { Component, Input, OnInit } from '@angular/core';
import { lignePanier } from '../../models/lignePanier';
import { NgFor, NgIf } from '@angular/common';
import { PanierService } from '../../services/panier.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthfirebaseService } from '../../services/authfirebase.service';
import { UserInterface } from '../../models/user.interface';
import { CommandeComponent } from "../commande/commande.component";
import { CommandeService } from '../../services/commande.service';
import { Commande } from '../../models/commande';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor, FormsModule, NavbarComponent, NgIf, CommandeComponent],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'], // Corrected to styleUrls
})
export class PanierComponent implements OnInit {
  @Input() detailsPanier!: lignePanier[];
  displayedColumns: string[] = ['description', 'prix', 'quantite', 'total', 'remove'];

  isAuthenticated = false;
  orderPlaced = false; // Track whether the order was placed successfully
  errorMessage: string | null = null; // To store any error messages

  public c1!: Commande; // Instance de Command pour stocker la commande

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
    this.orderPlaced = false; // Reset orderPlaced when clearing the cart
    this.errorMessage = null; // Clear any previous error messages
  }

  remove(productId: number): void {
    this.panierService.removeFromPanier(productId);
  }

  onOrder(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return; 
    }
    this.authService.getCurrentUserId().subscribe(async (userId) => {
      console.log('User ID:', userId); // Pour le débogage

      if (!userId) {
        console.log('Vous devez être connecté pour valider une commande.');
        return;
      }

    if (this.detailsPanier.length === 0) {
      alert('Votre panier est vide. Ajoutez des produits pour continuer.');
      return;
    }

    // Créer un tableau de détails à partir du panier
    const details = this.detailsPanier.map(item => ({
      produit: item.produit,
      qte: item.qte
    }));

    // Créer une commande avec l'ID de l'utilisateur, la date actuelle, les détails du panier et le prix total
    this.c1 = new Commande(userId, new Date(), details, this.getTotalPrice());
    console.log('Commande:', this.c1); // Pour le débogage

    // Enregistrer la commande
    await this.commandeService.saveCommande(this.c1);
    alert('Commande saved!');
  });
  
}
}