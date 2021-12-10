/**
 * imports All Salesmen from OrangeCRX
 * @param db target database
 * @return {Promise<Product[]>}
 */
const axios = require("axios");
const {ORANGE_BASE_URL, authenticate} = require("../models/OrangeHrmConfig");
const salesmanService = require("../services/salesman-service");
const Salesman = require("../models/Salesman");

const getSalesmenFromOrange = async function () {
	try {
		const employees = await axios.get(
			`${ORANGE_BASE_URL}/symfony/web/index.php/api/v1/employee/search`,
			{headers: {Authorization: `Bearer ${await authenticate()}`}}
		);
		const {data : { data }} = employees;
		return data.filter((e) => e.unit === 'Sales');
	} catch (error) {
		console.log(error);
	}
}

exports.synchronizeSalesmen = async function (db) {
	const salesmen = await getSalesmenFromOrange();
	for (const s of salesmen) {
		const salesman = new Salesman(s.employeeId, s.code, s.firstName, s.lastName, s.unit);
		const _s = await salesmanService.getBySid(db, salesman.sid);
		if (!_s) {
			await salesmanService.create(db, salesman);
		} else {
			delete salesman._id;
			await salesmanService.update(db, salesman.sid, salesman);
		}
	}
}
