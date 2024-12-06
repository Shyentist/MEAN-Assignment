import { Component, Input } from '@angular/core';
import { Product } from '../../models/product'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.css']
})
export class CartProductCardComponent {

  constructor(private authService: AuthService) { }

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

  removeFromCart(productId: string) {

    const token = this.authService.getAuthToken();

    const data = { _id: productId}

    fetch(
      'http://localhost:4000/cart', 
      { 
        method: 'DELETE', 
        headers: {
          "Content-Type": "application/json", 
          'Authorization': `Bearer ${token}`
        }, 
        body: JSON.stringify(data) 
      }
    ).then(res => {
      window.location.reload();
    })
  }
}
