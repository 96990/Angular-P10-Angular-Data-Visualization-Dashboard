import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { tap } from "rxjs";
import { Idata, IRow } from "./shared/shared.model";

@Injectable({providedIn: 'root'})

export class AppService{
    rowData: IRow[]= [];
    private http = inject(HttpClient);

    dummyAPI(){
        return this.http.get<Idata>('https://dummyjson.com/products?limit=100&skip=0').pipe(
            tap(response => {
                this.rowData = response.products;
            })
        );
    }
}