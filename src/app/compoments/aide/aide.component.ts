import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FAQ } from '../../models/FAQ';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, NavbarComponent],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.css'
})
export class AideComponent {
  faqs: FAQ[] = [
    {
      question: "Comment créer un compte ?",
      answer: "Pour créer un compte, cliquez sur 'S'inscrire' sur la page d'accueil et remplissez le formulaire avec vos informations.",
      isOpen: false // Initialiser isOpen à false
    },
    {
      question: "Comment réinitialiser mon mot de passe ?",
      answer: "Pour réinitialiser votre mot de passe, cliquez sur 'Mot de passe oublié ?' sur la page de connexion et suivez les instructions.",
      isOpen: false // Initialiser isOpen à false
    },
    {
      question: "Comment puis-je contacter le support ?",
      answer: "Vous pouvez contacter notre support client à l'adresse email support@emi-shop.com ou via notre page de contact.",
      isOpen: false // Initialiser isOpen à false
    },
    {
      question: "Quelles méthodes de paiement sont acceptées ?",
      answer: "Nous acceptons les cartes de crédit, PayPal et d'autres options de paiement sécurisées.",
      isOpen: false // Initialiser isOpen à false
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Après avoir passé une commande, vous recevrez un email de confirmation avec un lien pour suivre votre commande.",
      isOpen: false // Initialiser isOpen à false
    }
  ];
}