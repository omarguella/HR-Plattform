import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Password } from '../models/Password';
import { HttpClient } from '@angular/common/http';

/**
 * handles backend communication regarding user accounts
 */
@Injectable({
	providedIn: 'root'
})
export class UserService {
	baseUrl = '/api/user';

	constructor(private http: HttpClient) {
	}

	/**
	 * retrieves userdata of currently authenticated user
	 */
	getOwnUser(): Observable<User> {
		return this.http.get<User>('/api/self');
	}

	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.baseUrl, { observe: 'body', withCredentials: true });
	}

	getUserBySid(username: string): Observable<User> {
		return this.http.get<User>(`${ this.baseUrl }/${ username }`, { observe: 'body', withCredentials: true });
	}

	createUser(s: User): Observable<User> {
		return this.http.post<User>(this.baseUrl, s, { observe: 'body', withCredentials: true });
	}

	deleteUser(username: string): Observable<User> {
		return this.http.delete<User>(`${ this.baseUrl }/${ username }`, { observe: 'body', withCredentials: true });
	}

	updateUser(username: string, updatedValues: User): Observable<User> {
		return this.http.put<User>(`${ this.baseUrl }/${ username }`, updatedValues, { observe: 'body', withCredentials: true });
	}

	updatePassword(username: string, passwordValues: Password): Observable<Password> {
		return this.http.put<Password>(`${ this.baseUrl }/${ username }/password`, passwordValues, { observe: 'body', withCredentials: true });
	}
}
