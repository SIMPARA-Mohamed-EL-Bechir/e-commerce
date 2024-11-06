import { lignePanier } from "./lignePanier";

export class Commande {
    userId: string;
    dtecommande: Date;
    details: Array<lignePanier>;
    montant: number;

    constructor(
        userId: string,
        dtecommande: Date,
        details: Array<lignePanier>,
        montant: number 
    ){
        this.userId = userId;
        this.dtecommande = dtecommande;
        this.details = details;
        this.montant = montant;

    }
}