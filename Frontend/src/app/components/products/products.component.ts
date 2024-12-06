import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage: number = 1; // Current page
  itemsPerPage: number = 8; // Number of products per page
  selectedCategory: string = '';
  tags: { value: string, selected: boolean }[] = [];
  categories: string[] = [];
  minPrice: number = -Infinity;
  maxPrice: number = Infinity;
  productNameFilter: string = "";
  sorting: string = 'asc';

  constructor() {}

  ngOnInit() {
    this.fetchProducts();
  }

  ngOnChanges() {
    this.sortProducts();
  }

  fetchProducts() {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(products => {
        this.products = products;
        this.categories = this.getUniqueCategories(products);
        this.tags = this.getUniqueTags(products).map(tag => ({ value: tag, selected: false }));
        this.filteredProducts = products;
        this.sortProducts();
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  sortProducts() {
    if (this.sorting === 'asc') {
      // Sort products in ascending order by price
      this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sorting === 'desc') {
      // Sort products in descending order by price
      this.filteredProducts.sort((a, b) => b.price - a.price);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get onPageProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
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

  onCategorySelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.filterProducts();
  }
  
  onTagSelect() {
    this.filterProducts();
  }

  onPriceRangeChange() {
    this.filterProducts();
  }

  onProductNameChange() {
    this.filterProducts();
  }

  filterProducts() {
    let filteredProducts = this.products;
    const selectedTags = this.tags.filter(tag => tag.selected).map(tag => tag.value);

    if (this.selectedCategory !== '') {
      filteredProducts = filteredProducts.filter(product => product.category === this.selectedCategory);
    }

    if (selectedTags.length > 0) {
      filteredProducts = filteredProducts.filter(product =>
        selectedTags.every(tag => product.tags.includes(tag))
      );
    }

    if (this.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(product => product.price >= this.minPrice);
    }

    if (this.maxPrice !== undefined && this.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(product => product.price <= this.maxPrice);
    }

    if (this.productNameFilter) {
      filteredProducts = filteredProducts.filter(
        product => product.name.toLowerCase().includes(this.productNameFilter.toLowerCase())
      );
    }

    this.filteredProducts = filteredProducts;

    this.sortProducts()

    this.setPage(1)
  }

  private getUniqueTags(products: Product[]): string[] {
    const tagsSet = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }

  private getUniqueCategories(products: Product[]): string[] {
    const categoriesSet = new Set<string>();
    products.forEach(product => {
      categoriesSet.add(product.category);
    });
    return Array.from(categoriesSet);
  }
}