import { Component, Input } from '@angular/core';

import { Product } from '../../models/product'; 
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  isLoggedIn: boolean;
  showAlert:boolean = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isAuthenticated() && !this.authService.isTokenExpired();
  }

  @Input() product: Product = {
    _id: "",
    name: "Product name",
    details: "Product details",
    sku: "Product sku",
    category: "hats",
    tags: ["man", "woman"],
    price: 0.00,
    img: "noimage.png"
  };

  addToCart(productId: string) {

    const token = this.authService.getAuthToken();

    const data = { _id: productId}

    fetch('http://localhost:4000/cart', { method: 'POST', headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${token}`}, body: JSON.stringify(data) })

    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Hide after 3 seconds
  }
}
