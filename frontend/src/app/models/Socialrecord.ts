export class Socialrecord {
	constructor(
		public _id: string,
		public description: string,
		public sid: number,
		public year: number,
		public targetValue: number,
		public actualValue: number,
		public bonus: number,
		public comment: string
	) {
		this._id = _id;
		this.description = description;
		this.sid = sid;
		this.year = year;
		this.targetValue = targetValue;
		this.actualValue = actualValue;
		this.bonus = bonus;
		this.comment = comment;
	}
}
