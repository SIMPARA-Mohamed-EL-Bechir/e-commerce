import { Routes } from '@angular/router';
import { ListProductsComponent } from './compoments/list-products/list-products.component';
import { PanierComponent } from './compoments/panier/panier.component';
import { SignUpComponent } from './compoments/sign-up/sign-up.component';
import { DetailsProduitComponent } from './compoments/details-produit/details-produit.component';
import { LoginComponent } from './compoments/login/login.component';
import { AideComponent } from './compoments/aide/aide.component';


export const routes: Routes = [
    { path: '', component: ListProductsComponent }, // page d'accueil avec la liste des produits
  { path: 'panier', component: PanierComponent },  // page pour le panier
  { path: 'signup', component: SignUpComponent },    // exemple pour une page "signup"
  { path: 'login', component: LoginComponent },// exemple pour une page "contact"
  {path: 'details/:id', component: DetailsProduitComponent},
  {path:'aide', component: AideComponent},
  {path: 'admin', component: AideComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' } // redirection par défaut vers la page d'accueil
];
