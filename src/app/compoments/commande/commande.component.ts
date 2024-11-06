import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { lignePanier } from '../../models/lignePanier';
import { product } from '../../models/product';

@Component({
  selector: 'app-commande',
  standalone: true,
  imports: [],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  constructor(private productService: ProductService) {}


  saveOrder() {
    const userId = 'user123'; // Exemple d'ID utilisateur
    const montant = 150; // Montant total
    const dtecommande = new Date(); // Date actuelle
    const details: Array<lignePanier> = [      
    ];

    this.productService.addCommande(userId, montant, dtecommande, details)
      .then(() => {
        console.log("Commande ajoutée avec succès !");
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout de la commande :", error);
      });
  }
}

