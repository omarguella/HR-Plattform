const customerService = require("../services/customer-service");

/**
 * endpoint, which returns all customers
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
	res.json(await customerService.get());
}

exports.getById = async function(req, res) {
	const id = req.params.id;
	res.json(await customerService.getById(id));
}
