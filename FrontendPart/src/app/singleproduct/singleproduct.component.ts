import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../shared/models/products';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-singleproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './singleproduct.component.html',
  styleUrl: './singleproduct.component.scss',
})
export class SingleproductComponent implements OnInit {
  allProducts!: Products[];
  singleproduct!: Products;
  allRelatedProd: Products[] = [];
  isloading: boolean = false;
  buttonText: string = 'Add to Cart';
  isAdded: boolean = false;
  category!: string;

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    // Fetch all products first
    this.getAllProducts();

    // Fetch single product by route param
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.fetchSingleProduct(+id);
      }
    });
  }

  fetchSingleProduct(id: number) {
    this.apiService.getSIngleProduct(id).subscribe(
      (res) => {
        this.singleproduct = res;
        this.category = this.singleproduct.category;

        // Now that we have the single product, fetch related products
        this.filterRelatedProducts();
        this.isloading = true;
      },
      (err) => {
        console.log('Error fetching product:', err);
      }
    );
  }

  getAllProducts() {
    this.apiService.getProducts().subscribe(
      (res) => {
        this.allProducts = res;

        // Call getRelatedProduct() only when all products are fetched
        this.filterRelatedProducts();
      },
      (err) => {
        console.log('Error occurred', err);
      }
    );
  }

  filterRelatedProducts() {
    // Ensure both singleproduct and allProducts are available before filtering
    if (this.singleproduct && this.allProducts && this.allProducts.length > 0) {
      this.allRelatedProd = this.allProducts.filter(
        (prod) =>
          prod.category.toLowerCase() === this.singleproduct.category.toLowerCase() &&
          prod.id !== this.singleproduct.id
      );
    }
  }

  viewProduct(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  addToCart() {
    this.cartService.setCart(this.singleproduct);
    this.isAdded = true;
    this.buttonText = 'Added to Cart!';
    this.cartService.countNumber()

    setTimeout(() => {
      this.isAdded = false;
      this.buttonText = 'Add to Cart';
    }, 2000);
  }
}
