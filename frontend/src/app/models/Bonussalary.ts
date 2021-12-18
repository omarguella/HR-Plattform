export class Bonussalary {
	constructor(
		public sid: number,
		public year: number,
		public value: number,
		public remarks: string,
		public isOpen = true
	) {
		this.sid = sid;
		this.year = year;
		this.value = value;
		this.remarks = remarks;
		this.isOpen = isOpen;
	}
}
