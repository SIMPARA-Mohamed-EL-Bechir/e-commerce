import { Component, OnInit } from '@angular/core';
import { product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { comment } from '../../models/comment';
import { user } from '../../models/user';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [NgIf, NgFor, NavbarComponent, FormsModule, CommonModule],
  templateUrl: './details-produit.component.html',
  styleUrl: './details-produit.component.css'
})
export class DetailsProduitComponent implements OnInit {
  product!: product;
  newComment!: comment;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    // Initialisation d'un nouveau commentaire avec un utilisateur vide
    this.newComment = new comment(
      new user('', '', ''),  // L'utilisateur devra être fourni par l'interface (par exemple, nom d'utilisateur)
      new Date(),            // La date actuelle
      '',                    // Commentaire vide
      0                      // Note par défaut
    );
  }
  ngOnInit(): void {
    // Récupérer l'ID du produit depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id !== null) {
      const productId = +id; // Convertir l'ID en nombre
      this.productService.getProductById(productId).subscribe(
        (response: product) => {
          this.product = response;  // Assignation directe du produit à la variable product
        },
        (error) => {
          console.error('Erreur lors de la récupération du produit', error);
        }
      );
    } else {
      console.error("L'ID du produit est introuvable dans l'URL.");
    }
  }

  submitComment(): void {
    // Ajoute le commentaire au produit
    if (this.product) {
      const newReview = {
        reviewerName: this.newComment.user.username,
        reviewerEmail: this.newComment.user.mail,
        comment: this.newComment.comment,
        date: new Date().toISOString(),
        rating: this.newComment.rating
      };

      // Ajoute le commentaire aux avis existants
      this.product.reviews.push(newReview);

      // Réinitialise le formulaire
      this.newComment = new comment(
        new user('', '', ''),  // Réinitialiser les champs
        new Date(),
        '',
        0
      );
    }
  }
}