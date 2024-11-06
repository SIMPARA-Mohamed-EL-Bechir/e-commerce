import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';
import { 
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  getDoc
  
} from '@angular/fire/firestore';
import { lignePanier } from '../models/lignePanier';
import { deleteDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private firestore: Firestore) { 
  }


  addCommande(userId: string, montant: number, dtecommande: Date, details: Array<lignePanier>): Promise<void> {
    const commandeData = {
      userId,
      montant,
      dateCommande: dtecommande,
      details
    };

    const collectionInstance = collection(this.firestore, 'orders');
    return addDoc(collectionInstance, commandeData)
      .then(() => {
        console.log("Commande enregistrée avec succès !");
      })
      .catch(error => {
        console.error("Erreur lors de l'enregistrement de la commande :", error);
        throw error;
      });
  }

  getAllOrders(){
    const collectionInstance = collection(this.firestore,'orders')

   return  collectionData(collectionInstance, {idField : 'id'})

  }

  getOrderId(id:string){
    const collectionInstance = collection(this.firestore,'orders')

    const docinstance = doc(this.firestore,'orders',id)

    return getDoc(docinstance)


  }

  updateOrder(id:string){
    const docinstance = doc(this.firestore,'products',id)
    const updatedOrder : any= {name : "updated name", montant : 1000}
    updateDoc(docinstance,updatedOrder)
    .then(()=>console.log(`Order with ${id} updated successfully ! `))
    .catch(error=>console.log(error))
  }

  deleteOrder(id:string){
    const docinstance = doc(this.firestore,'orders',id)
    deleteDoc(docinstance)
    .then(()=>console.log('data deleted !'))
    .catch(error=>console.log(error))
  }

  getProducts(): Observable<any>{
    return this.http.get('https://dummyjson.com/products')
  }

  getProductBycategory(): Observable<any>{
    return this.http.get('https://dummyjson.com/products')

  }

  getProductBykey(text : string){
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`)
  }

  getProductById(id: number): Observable<product> {
    return this.http.get<product>(`https://dummyjson.com/products/${id}`);
  }

  
}
