import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./compoments/navbar/navbar.component";
import { ListProductsComponent } from "./compoments/list-products/list-products.component";

import { FooterComponent } from './compoments/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, NavbarComponent, ListProductsComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
