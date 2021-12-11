export class Product {
	constructor(
		public id: string,
		public name: string,
		public description: string,
		public productNumber: number) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.productNumber = productNumber;
	}
}
