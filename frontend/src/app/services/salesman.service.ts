import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Salesman } from '../models/Salesman';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SalesmanService {
	baseUrl = '/api/salesman';

	constructor(private http: HttpClient) {
	}

	getSalesman(): Observable<Salesman[]> {
		return this.http.get<Salesman[]>(this.baseUrl, { observe: 'body', withCredentials: true });
	}

	createSalesman(s: Salesman): Observable<Salesman> {
		return this.http.post<Salesman>(this.baseUrl, s, { observe: 'body', withCredentials: true });
	}

	deleteSalesman(sid: number): Observable<Salesman> {
		return this.http.delete<Salesman>(`${ this.baseUrl }/${ sid }`, { observe: 'body', withCredentials: true });
	}

	updateSalesman(sid: number, updatedValues: Salesman): Observable<Salesman> {
		return this.http.put<Salesman>(`${ this.baseUrl }/${ sid }`, updatedValues, { observe: 'body', withCredentials: true });
	}

	synchronize(): Observable<void> {
		return this.http.get<void>('/api/orangehrm', { withCredentials: true });
	}
}
