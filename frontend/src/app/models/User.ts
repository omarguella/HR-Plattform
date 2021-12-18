/**
 * this model specifies the format to exchange a user with the backend
 */
export class User {
	constructor(
		public username: string,
		public firstname: string,
		public lastname: string,
		public email: string,
		public role: string,
		public password: string,
		public sid: number
	) {
	}
}
