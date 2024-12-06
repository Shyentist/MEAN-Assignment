import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {
  products: Product[] = [];
  selectedProducts: Product[] = []; // Array to track selected products
  categories: string[] = ['hats', 't-shirts', 'trousers', 'jackets', 'hoodies', 'shoes'];
  nameToAdd:string = "";
  detailsToAdd:string = "";
  tagsToAdd:string = "";
  categoryToAdd:string = "";
  priceToAdd:number = 0;
  skuToAdd:string = "";
  uniqueTags:string[] = [];
  uniqueTagsIndex:string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  trackByFn(index:number) {
    return index;  
  }

  fetchProducts() {
    fetch('http://localhost:4000/products')
      .then(response => response.json())
      .then(products => {
        this.products = products;
        this.uniqueTags = this.getUniqueTags(products);
        this.uniqueTagsIndex = this.getUniqueTags(products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  private getUniqueTags(products: Product[]): string[] {
    const tagsSet = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }

  updateTags() {

    if(JSON.stringify(this.uniqueTags) !== JSON.stringify(this.uniqueTagsIndex)){
      console.log("hehe")
      const token = this.authService.getAuthToken();

      const data = {
        newTags: this.uniqueTags,
        oldTags: this.uniqueTagsIndex
      }

      fetch(
        'http://localhost:4000/tags', 
        { 
          method: 'PUT', 
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

  deleteTag(index: number) {
    // Delete the tag at the specified index from the uniqueTags array
    this.uniqueTags[index] = ''
  }

  addProduct() {

    const token = this.authService.getAuthToken();

    if(this.skuToAdd){
      const data = [{
        name: this.nameToAdd,
        details: this.detailsToAdd,
        category: this.categoryToAdd,
        tags: this.tagsToAdd.split(','),
        price: this.priceToAdd,
        sku: this.skuToAdd
      }]
  
      fetch(
        'http://localhost:4000/products', 
        { 
          method: 'POST', 
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

  deleteSelectedProducts() {

    const token = this.authService.getAuthToken();

    let ids:string[] = []
    let skus:string[] = []
    
    this.selectedProducts.forEach(product => {
      ids.push(product._id)
      skus.push(product.sku)
    })

    const data = { ids: ids,skus: skus }

    if(ids.length !== 0){
      fetch(
        'http://localhost:4000/products', 
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

  onTagsChange(tagsInput: string, id: string) {
    this.products.forEach(product =>{
      if(product._id === id){
        product.tags = tagsInput.split(',')
      }
    }) 
  }

  updateSelectedProducts() {
    const token = this.authService.getAuthToken();

    let selectedProducts = this.selectedProducts

    selectedProducts.forEach(product => {
      product.tags = product.tags.filter(tag => tag)
    })

    const data = {selectedProducts: selectedProducts}

    if(this.selectedProducts.length !== 0){
      fetch(
        'http://localhost:4000/products', 
        { 
          method: 'PUT', 
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

  toggleProductSelection(product: Product) {
    if (this.isSelected(product)) {
      // Deselect the product
      this.selectedProducts = this.selectedProducts.filter((p) => p !== product);
    } else {
      // Select the product
      this.selectedProducts.push(product);
    }
  }

  isSelected(product: Product): boolean {
    return this.selectedProducts.includes(product);
  }

  handleFileInput(event: Event, sku:string) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();

      const token = this.authService.getAuthToken();

      console.log(sku)
      
      formData.append('image', file, `${sku}.jpg`);

      fetch('http://localhost:4000/imgs', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`
        },
        body: formData
      }).then(res => {
        window.location.reload();
      })

      
    }
  }
}
