const orderService = require("../services/order-service");
const salesmanService = require("../services/salesman-service");
/**
 * endpoint, which returns all orders
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
	const year = parseInt(req.query.year);
	const sid = parseInt(req.query.sid);
	const db = req.app.get('db');

	if(sid && year) {
		const _s = await salesmanService.getBySid(db, sid);
		if (!_s) {
			res.status(404).json({message: 'Salesman Not Found'});
		} else {
			const orders = (await orderService.get(db)).filter(
				(order) => order.year === year && order.salesman.sid === sid
			);
			res.json(orders);
		}
	} else {
		res.json(await orderService.get(db));
	}

}
