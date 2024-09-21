import { Component, OnInit } from '@angular/core';
import { Products } from '../shared/models/products';
import { ApiService } from '../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatIcon],
templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products!: Products[];
  SearchText!: string;
  issearchproduct: boolean= false;
  initialProducts : Products[] = this.products;
  currentIndex: number = 0;
  images!: string[]
  

  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit() {
    this.getProducts();
    
  }

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  searchData(){
    let product = this.products.filter(product =>
      product.title.toLowerCase().includes(this.SearchText.toLowerCase())
      || product.category.toLowerCase().includes(this.SearchText.toLowerCase())

    );

    this.products=product;

    if(this.products.length>0){
      this.issearchproduct = true;
    }
  }
  
  resetProducts(){
    this.products=this.initialProducts;
    this.SearchText = ''
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProducts().subscribe(
      (res) => {
        this.products = res;

        this.images = this.products.map(product => product.image);  
        
        console.log(this.images);
        
      },
      (err) => {
        console.log('Error occurred', err);
      }
    );
  }


  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }


}
