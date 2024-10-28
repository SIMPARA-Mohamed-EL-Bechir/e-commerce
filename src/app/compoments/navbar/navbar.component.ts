import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { lignePanier } from '../../models/lignePanier';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthfirebaseService } from '../../services/authfirebase.service';
import { UserInterface } from '../../models/user.interface';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  searchService = inject(ProductService)
  router = inject(Router)
  authService = inject(AuthfirebaseService);
  isSearchActive: boolean = false;
  @Input() currentPanier : lignePanier[]=[];
  @Output() displayedPanier = new EventEmitter<boolean> ;
  categories : string[]=[];
  searchKey !: string;
  @Output() searchedText = new EventEmitter<string>();
  constructor (private productService : ProductService){}
  isAuthenticated: boolean = false;
  

  ngOnInit(): any {
    this.productService.getProductBycategory()
    .subscribe((response :any) =>{
      this.categories = response;
      }, (error: any) => {
        console.error('Error fetching products', error);  
      });

      this.productService.getProductBycategory();

      this.authService.user$.subscribe((user: UserInterface) => {
        this.isAuthenticated = !!user;
      });
      
    }

    showPanier(){
      this.displayedPanier.emit(true);
    }
  
  
    toggleSearch() {
      this.isSearchActive = !this.isSearchActive; 
    }

    onSearchByKey(){
      console.log(this.searchKey)
      this.searchedText.emit(this.searchKey)

    }

    navigateToLogin() {
      this.router.navigate(['/login']);
    }

    onLogout(): void {
      this.authService.logout().then(() => {
        this.router.navigate(['/']);
        this.isAuthenticated = false;
      });
    }
    

}
