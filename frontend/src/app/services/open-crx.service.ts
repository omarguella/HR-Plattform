import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { Customer } from '../models/Customer';
import { Order } from '../models/Order';

@Injectable({
	providedIn: 'root'
})
export class OpenCrxService {
	baseUrl = '/api/opencrx';

	constructor(private http: HttpClient) {
	}

	getProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(`${ this.baseUrl }/product`, { observe: 'body', withCredentials: true });
	}

	getCustomers(): Observable<Customer[]> {
		return this.http.get<Customer[]>(`${ this.baseUrl }/customer`, { observe: 'body', withCredentials: true });
	}

	getOrders(): Observable<Order[]> {
		return this.http.get<Order[]>(`${ this.baseUrl }/order`, { observe: 'body', withCredentials: true });
	}

	getOrdersBySidAndYear(sid: number, year: number): Observable<Order[]> {
		const params = new HttpParams().append('sid', sid.toString(10)).append('year', year.toString(10));
		return this.http.get<Order[]>(`${ this.baseUrl }/order`, { observe: 'body', withCredentials: true, params });
	}

}
