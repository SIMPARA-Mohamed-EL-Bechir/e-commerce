import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { Commande } from '../models/commande';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private fireStore: Firestore) {}

  // Méthode pour enregistrer une commande dans Firestore
  async saveCommande(commande: Commande): Promise<void> {
    try {
      const commandesRef = collection(this.fireStore, 'commandes');
      await addDoc(commandesRef, {
        userId: commande.userId,
        dateCommande: commande.dtecommande,
        details: commande.details,
        montant: commande.montant
      });
      console.log('Commande saved successfully!');
    } catch (error) {
      console.error('Error saving commande: ', error);
    }
  }

  // Méthode pour obtenir toutes les commandes
  getAllOrders(): Observable<any[]> {
    const commandesRef = collection(this.fireStore, 'commandes'); // Utiliser 'commandes' ici
    return collectionData(commandesRef, { idField: 'id' });
  }

  // Méthode pour obtenir une commande par ID
  async getOrderById(id: string): Promise<any> {
    try {
      const orderDoc = doc(this.fireStore, 'commandes', id); // Utiliser 'commandes' ici
      const docSnapshot = await getDoc(orderDoc);
      return docSnapshot.exists() ? { id, ...docSnapshot.data() } : null; // Inclure l'ID dans le retour
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }

  // Méthode pour mettre à jour une commande par ID
  async updateOrder(id: string, updatedOrder: Partial<Commande>): Promise<void> {
    try {
      const orderDoc = doc(this.fireStore, 'commandes', id); // Utiliser 'commandes' ici
      await updateDoc(orderDoc, updatedOrder);
      console.log(`Order with ID ${id} updated successfully!`);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  }

  // Méthode pour supprimer une commande par ID
  async deleteOrder(id: string): Promise<void> {
    try {
      const orderDoc = doc(this.fireStore, 'commandes', id); // Utiliser 'commandes' ici
      await deleteDoc(orderDoc);
      console.log('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }
}