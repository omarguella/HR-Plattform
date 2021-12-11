import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
	providedIn: 'root'
})
export class OpenCrxService {
	baseUrl: '/api/openCrx';

	constructor(private http: HttpClient) {
	}

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(`${ this.baseUrl }/product`, { observe: 'body', withCredentials: true });
	}

}
