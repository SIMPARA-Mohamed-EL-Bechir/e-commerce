import { Component, Input, OnInit } from '@angular/core';
import { lignePanier } from '../../models/lignePanier';
import { NgFor, NgIf } from '@angular/common';
import { PanierService } from '../../services/panier.service';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { AuthfirebaseService } from '../../services/authfirebase.service';
import { UserInterface } from '../../models/user.interface';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [NgFor, FormsModule, NavbarComponent, NgIf],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent implements OnInit {
  @Input() detailsPanier!: lignePanier[];
  displayedColumns: string[] = ['description', 'prix', 'quantite', 'total', 'remove'];

  isAuthenticated = false;

  constructor(
    private panierService: PanierService,
    private router: Router,
    private authService: AuthfirebaseService
  ) {}

  ngOnInit(): void {
    this.panierService.detailsPanier$.subscribe((detailsPanier) => {
      this.detailsPanier = detailsPanier;
    });

    this.authService.user$.subscribe((user: UserInterface) => {
      this.isAuthenticated = !!user; // true si l'utilisateur est connecté, false sinon
    });
  }

  getTotalPrice(): number {
    return this.detailsPanier.reduce((acc, item) => acc + item.qte * item.produit.price, 0);
  }

  clear(): void {
    this.panierService.clearPanier();
  }

  remove(productId: number): void {
    this.panierService.removeFromPanier(productId);
  }

  onOrder(): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      // Logique pour valider la commande
      console.log('Commande validée');
    }
  }
}
