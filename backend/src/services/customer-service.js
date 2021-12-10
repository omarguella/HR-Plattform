const axios = require('axios');
const {CRX_BASE_URL, CRX_CONFIG} = require("../models/openCRX/OpenCrxConfig.js");
const Customer = require("../models/openCRX/Customer");

exports.get = async function() {
	const customers = [];

	const res = await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`,
		CRX_CONFIG
	);

	const {data: {objects}} = res;
	const filteredCustomers = objects.filter((item) => item.industry !== undefined)
	for (const item of filteredCustomers) {
		customers.push(await createCustomerFromOpenCrx(item))
	}

	return customers;
}

exports.getById = async function(id) {
	const res = await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/${id}`,
		CRX_CONFIG
	);

	const {data} = res;

	return await createCustomerFromOpenCrx(data);
}

const createCustomerFromOpenCrx = async function (openCrxCustomerData) {
	const id = openCrxCustomerData.identity.split("/").at(-1);
	const {fullName, accountRating} = openCrxCustomerData;

	return new Customer(id, fullName, accountRating);
}

