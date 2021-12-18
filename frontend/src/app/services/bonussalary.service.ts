import { Injectable } from '@angular/core';
import { Bonussalary } from '../models/Bonussalary';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BonussalaryService {
	baseUrl = '/api/bonussalary';

	constructor(private http: HttpClient) {
	}

	getOpenBonussalaries(): Observable<Bonussalary[]> {
		return this.http.get<Bonussalary[]>(`${ this.baseUrl }`, { observe: 'body', withCredentials: true })
			.pipe(
				map((bonuses) => bonuses.filter(bonus => bonus.isOpen))
			);
	}

	getClosedBySid(sid: number): Observable<Bonussalary[]> {
		return this.http.get<Bonussalary[]>(`${ this.baseUrl }/${sid}`, { observe: 'body', withCredentials: true })
			.pipe(
				map((bonuses) => bonuses.filter(bonus => !bonus.isOpen))
			);
	}

	addBonusSalary(bonussalary: Bonussalary): Observable<void> {
		return this.http.post<void>(`${ this.baseUrl }`, bonussalary, { withCredentials: true });
	}

	confirmBonussalary(bonussalary: Bonussalary): Observable<void> {
		return this.http.post<void>('/api/orangehrm', bonussalary, { withCredentials: true });
	}
}
