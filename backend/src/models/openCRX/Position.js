/**
 * Position model from openCRX
 * @param {Product} product
 * @param {number} quantity
 */
class Position {
	constructor(product, quantity) {
		this.product = product;
		this.quantity = quantity;
	}
}

module.exports = Position;
