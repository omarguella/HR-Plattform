const axios = require('axios');
const {CRX_BASE_URL, CRX_CONFIG} = require("../models/openCRX/OpenCrxConfig.js");
const salesmanService = require('../services/salesman-service');
const customerService = require('../services/customer-service');
const productService = require('../services/product-service')
const Position = require('../models/openCRX/Position')
const Order = require("../models/openCRX/Order");

exports.get = async function (db) {
	const orders = [];
	let year;
	let salesman;
	let customer;
	let position;

	const res = await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`,
		CRX_CONFIG
	);

	const {data: {objects}} = res;

	for (const obj of objects) {
		year = getYearFromOrder(obj)
		salesman = await getSalesmanFromOrder(db, obj);
		customer = await getCustomerFromOrder(obj);
		position = await getPositionFromOrder(obj);

		if (position.length > 0) {
			orders.push(new Order(year,customer, salesman, position));
		}
	}

	return orders;
}

const getYearFromOrder = function(order) {
	return parseInt(order['createdAt'].split('-')[0]);
}

const getSalesmanFromOrder = async function (db, order) {
	const salesmanId = order['salesRep']['@href'].split("/").at(-1);
	const res = (await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${salesmanId}`,
		CRX_CONFIG
	));

	const {data: {governmentId}} = res;
	return (await salesmanService.get(db)).find((s) => s.code === governmentId);
}

const getCustomerFromOrder = async function (order) {
	const customerId = order['customer']['@href'].split("/").at(-1);
	return (await customerService.getById(customerId));
}

const getPositionFromOrder = async function (order) {
	const positions = [];

	const orderId = order['@href'].split("/").at(-1);
	const res = await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/${orderId}/position`,
		CRX_CONFIG
	);

	const {data: {objects}} = res;

	if (objects) {
		for(const obj of objects) {
			const productId = obj['product']['@href'].split("/").at(-1);
			const product = await productService.getById(productId);
			const quantity = obj['quantity']
			positions.push(new Position(product, quantity))
		}
	}

	return positions;
}
