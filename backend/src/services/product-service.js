const axios = require("axios");
const {CRX_BASE_URL, CRX_CONFIG} = require('../models/openCRX/OpenCrxConfig.js');
const Product = require("../models/openCRX/Product");

/**
 * gets All Products from openCRX
 * @return {Promise<Product[]>}
 */
exports.get = async function () {
	const products = [];

	const res = await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product`,
		CRX_CONFIG
	);

	const {data: {objects}} = res;
	for (const item of objects) {
		products.push(await createProductFromOpenCrx(item))
	}

	return products;
}

/**
 * gives a unique Product back
 * @param {string} id
 * @return {Promise<Product>}
 */
exports.getById = async function (id) {
	const res = await axios.get(
		`${CRX_BASE_URL}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/${id}`,
		CRX_CONFIG
	);

	const {data} = res;

	return await createProductFromOpenCrx(data);
}

/**
 * Helper function to extract needed data from response Product Object
 * @return {Promise<Product>}
 */
async function createProductFromOpenCrx(openCrxProductData) {
	const id = openCrxProductData.identity.split("/").at(-1);
	const {name, productNumber, description} = openCrxProductData;

	return new Product(id, name, description, productNumber);
}




