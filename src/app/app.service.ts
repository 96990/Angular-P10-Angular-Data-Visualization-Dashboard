import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Idata } from "./shared/shared.model";

@Injectable({providedIn: 'root'})

export class AppService{
    loggedIn = signal(false);
    baseUrl = "https://dummyjson.com/products";
    private http = inject(HttpClient);

    getProducts(limit: number, skip: number){
        return this.http.get<Idata>(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
    }
}