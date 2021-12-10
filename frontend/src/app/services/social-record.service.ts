import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Socialrecord } from '../models/Socialrecord';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SocialRecordService {
	baseUrl = '/api/socialrecord';

	constructor(private http: HttpClient) {
	}

	getSocialRecords(): Observable<Socialrecord[]> {
		return this.http.get<Socialrecord[]>(this.baseUrl, { observe: 'body', withCredentials: true });
	}

	getSocialRecordsBySid(sid: number): Observable<Socialrecord[]> {
		const params = new HttpParams().append('sid', sid.toString(10));
		return this.http.get<Socialrecord[]>(this.baseUrl, {observe: 'body', withCredentials: true, params });
	}

	getSocialRecordsBySidAndYear(sid: number, year: number): Observable<Socialrecord[]> {
		return this.http.get<Socialrecord[]>(`${ this.baseUrl }/${ sid }/${ year }`, { observe: 'body', withCredentials: true });
	}

	createSocialRecord(s: Socialrecord): Observable<Socialrecord> {
		return this.http.post<Socialrecord>(this.baseUrl, s, { observe: 'body', withCredentials: true });
	}

	deleteSocialRecord(id: string): Observable<Socialrecord> {
		return this.http.delete<Socialrecord>(`${ this.baseUrl }/${ id }`, { observe: 'body', withCredentials: true });
	}

	updateSocialRecord(id: string, updatedValues: Socialrecord): Observable<Socialrecord> {
		return this.http.put<Socialrecord>(`${ this.baseUrl }/${ id }`, updatedValues, { observe: 'body', withCredentials: true });
	}
}
