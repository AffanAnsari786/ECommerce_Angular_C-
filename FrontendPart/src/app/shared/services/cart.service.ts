import { Injectable } from '@angular/core';
import { Products } from '../models/products';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Products[] = [];
  SearchText: string = ''
  isLogin: boolean | null = null;

  constructor() { }

  getCart(){
    return this.cart;
  }

  setCart(product : Products){
    this.cart.push(product)
    
  }

  removeCart(product : Products){

    const index = this.cart.findIndex(res => res.id === product.id);
    
    if(index !=-1){
      this.cart.splice(index, 1); 
    }
  }

  emptyCart(){
    this.cart = [];
  }


  setSearchText(searchtext: string){
    this.SearchText = searchtext
  }

  getSearchText(){
    return this.SearchText
  }


  //Login Logout implementation
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedInInLocalStorage()); 

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }

  login() {
    this.loggedIn.next(true); 
    localStorage.setItem('isLoggedIn', 'true'); 
  }

  logout() {
    this.loggedIn.next(false); 
    localStorage.removeItem('isLoggedIn');
  }
  private isLoggedInInLocalStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }


  //Counting the number of product added to cart

  private count = new BehaviorSubject<number>(0);
  countVal: number = 0;
  

  get getCount(){
    return this.count.asObservable()
  }

  countNumber(){
    this.countVal = this.countVal + 1;
    this.count.next(this.countVal)
  }

  subtractCount(){
    this.countVal = this.countVal - 1;
    this.count.next(this.countVal)
  }
  resetCount(){
    this.countVal = 0;
    this.count.next(this.countVal)
  }
}

  