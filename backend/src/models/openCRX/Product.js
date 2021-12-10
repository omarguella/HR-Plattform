/**
 * product model from openCRX
 * @param {string} id
 * @param {string} name
 * @param {string} description
 * @param {number} productNumber
 */
class Product {
	constructor(id, name, description, productNumber) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.productNumber = productNumber;
	}
}

module.exports = Product;
