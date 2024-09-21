import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Products } from '../shared/models/products';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  allCartProduct: Products[] = [];
  allcartPrice: any[] = [];
  totalPrice: number = 0;
  ischeckOut: boolean = false;

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.allCartProduct = this.cartService.getCart();
   this.gettotalprice();
    
  }

  gettotalprice(){
    this.allcartPrice = []
    this.allCartProduct.map((res)=>{
      let price = res.price;
      this.allcartPrice.push(price)
    })
    
    this.totalPrice = this.allcartPrice.reduce((acc, curr) => acc + curr, 0);
    console.log(this.totalPrice);
  }
  

  removeCart(removeProd: Products){
    this.cartService.removeCart(removeProd);
    this.gettotalprice()
    this.cartService.subtractCount();

  }

  resetcart(){
    this.ischeckOut = true;
    this.cartService.emptyCart();
    this.allCartProduct =  this.cartService.getCart();
    this.cartService.resetCount()
  }

}
