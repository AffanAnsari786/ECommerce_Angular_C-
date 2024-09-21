import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { map, Observable, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIcon, MatIconButton, 
    CommonModule, FormsModule, MatCardModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MiniProject';
  UserID!:string|null;
  isLogin: boolean = true;
  SearchText: string ='';
  count: number = 0

  constructor(private cartService: CartService, private routers: Router){}

  ngOnInit(): void {
    this.UserID=localStorage.getItem("UserID");

    this.cartService.isLoggedIn.subscribe((status) => {
      this.isLogin = status;
    });

    this.cartService.getCount.subscribe((status)=>{
      this.count = status;
      console.log(status);
      
    });


  }

  logout() {
    this.cartService.logout();
    localStorage.removeItem('UserID');
    localStorage.removeItem('UserName');
    this.routers.navigate(['/login']);
  }
  

  searchData(){
    this.cartService.setSearchText(this.SearchText)
  }

  router =[
    {
      pageName:'products',
      icon:'movie',
      url:'/products',
    }
    
  ];

  

}
