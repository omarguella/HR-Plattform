import { Product } from './Product';

export class Position {
	constructor(public product: Product, public quantity: number) {
		this.product = product;
		this.quantity = quantity;
	}
}
