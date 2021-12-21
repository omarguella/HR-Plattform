const productService = require('../services/product-service');
/**
 * endpoint, which returns all products
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
	res.json(await productService.get());

	// #swagger.tags = ['OpenCRX Products']
}

/**
 * endpoint, which returns all products
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
*/
exports.getById = async function(req, res) {
	const id = req.params.id;
	res.json(await productService.getById(id));

	// #swagger.tags = ['OpenCRX Products']
}
