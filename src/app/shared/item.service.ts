import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { HttpClient } from '@angular/common/http';
;

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) { }
    readonly baseURL = 'http://localhost:5000'

    formData: Item = new Item();

    postItem() {
        return this.http.post(this.baseURL, this.formData)
    }
}
