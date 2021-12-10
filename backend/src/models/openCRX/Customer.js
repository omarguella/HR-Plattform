/**
 * customer model from openCRX
 * @param {string} id
 * @param {string} fullName
 * @param {number} rating
 */
class Customer {
	constructor(id, fullname, rating) {
		this.id = id;
		this.fullname = fullname;
		this.rating = rating;
	}
}

module.exports = Customer;
