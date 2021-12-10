/**
 * SalesOrder model from openCRX
 * @param {number} year
 * @param {Customer} customer
 * @param {Salesman} salesman
 * @param {Position[]} positions
 */
class Order {
	constructor(year, customer, salesman, positions) {
		this.year = year;
		this.customer = customer;
		this.salesman = salesman;
		this.positions = positions;
	}
}

module.exports = Order;
