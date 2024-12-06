import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: Product[] = [];
  currentPage: number = 1; // Current page
  itemsPerPage: number = 8; // Number of products per page
  checkOutPrice: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {

    const token = this.authService.getAuthToken();

    fetch('http://localhost:4000/cart', { headers: {'Authorization': `Bearer ${token}`} })
      .then(response => response.json())
      .then(products => {
        this.products = products;

        let checkOutPrice = 0;

        this.products.forEach(product => {
          checkOutPrice += product.price
        });

        this.checkOutPrice = checkOutPrice.toFixed(2);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

}
