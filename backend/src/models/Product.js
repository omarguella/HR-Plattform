/**
 * product model from openCRX
 * @param {string} id
 * @param {string} name
 * @param {number} minPositions
 * @param {number} maxPositions
 */
class Product {
	constructor(id, name, minPositions, maxPositions) {
		this.id = id;
		this.name = name;
		this.minPositions = minPositions;
		this.maxPositions = maxPositions;
	}
}

module.exports = Product;
