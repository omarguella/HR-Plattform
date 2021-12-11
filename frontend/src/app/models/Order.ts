import { Customer } from './Customer';
import { Salesman } from './Salesman';
import { Position } from './Position';
import { Product } from './Product';

export class Order {
	constructor(public year: number, public customer: Customer, public salesman: Salesman, public positions: Position[]) {
		this.year = year;
		this.customer = customer;
		this.salesman = salesman;
		this.positions = positions;
	}
}

export class SingleOrder {
	public bonus: number;

	constructor(
		public year: number,
		public customer: Customer,
		public salesman: Salesman,
		public product: Product,
		public quantity: number
	) {
		this.bonus = Math.round((1 / this.customer.rating) * 500);
	}
}
