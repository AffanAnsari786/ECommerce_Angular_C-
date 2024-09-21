import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  feedBasePath = environment.feedPath;
  userBasePath = environment.userPath;
  basepostpath = environment.basepostpath;
  baseproducts= environment.baseproducts

  constructor(private http: HttpClient, private router: Router) { }

getUser(){
  try {
    return this.http.get(`${this.userBasePath}/getAll`)
    
  } catch (error) {
    throw new Error()
  }
}


login(userName: string, password: string) {
  return this.http.get<any>(`${this.userBasePath}/getSingle`, {
    params: {
      userName: userName,
      password: password
    }
  });
}

register(signUpUserName: string, signUpPassword: string) {
  return this.http.post<any>(`${this.userBasePath}/add`, {
    userName: signUpUserName,
    password: signUpPassword
  });
}


getProducts():Observable<any>{
  return this.http.get<any>(`${this.baseproducts}/products`)
}


getSIngleProduct(id: number){
  return this.http.get<any>(`${this.baseproducts}/products/${id}` )
}


isLoggedIn(): boolean {
  return !!localStorage.getItem('UserID');
}

}