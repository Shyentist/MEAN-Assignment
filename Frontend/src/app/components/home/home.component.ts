import { Component } from '@angular/core';
import { Product } from '../../models/product'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];
  currentPage: number = 1; // Current page
  itemsPerPage: number = 4; // Number of products per page

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    fetch('http://localhost:4000/products/query?tags=featured')
      .then(response => response.json())
      .then(products => {
        this.products = products;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get onPageProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
