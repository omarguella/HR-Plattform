const axios = require("axios");
const {ORANGE_BASE_URL, authenticate} = require("../models/orangeHRM/OrangeHrmConfig");
const salesmanService = require("../services/salesman-service");
const Salesman = require("../models/Salesman");
const FormData = require('form-data');
const {COLLECTIONS} = require("../utils/globals");

exports.getSalesmenFromOrange = async function () {
	try {
		const employees = await axios.get(
			`${ORANGE_BASE_URL}/symfony/web/index.php/api/v1/employee/search`,
			{headers: {Authorization: `Bearer ${await authenticate()}`}}
		);
		const {data: {data}} = employees;
		return data.filter((e) => e.unit === 'Sales');
	} catch (error) {
		console.log(error);
	}
}

/**
 * imports All Salesmen from OrangeHRM
 * @param db target database
 * @return {Promise<Salesman[]>}
 */
exports.synchronizeSalesmen = async function (db) {
	const salesmen = await exports.getSalesmenFromOrange();
	for (const s of salesmen) {
		const salesman = new Salesman(
			parseInt(s["employeeId"]),
			parseInt(s["code"]),
			s["firstName"] + (s["middleName"] ? " " + s["middleName"] : ""),
			s["lastName"],
			s["unit"]
		);
		const _s = await salesmanService.getBySid(db, salesman.sid);
		if (!_s) {
			await salesmanService.create(db, salesman);
		} else {
			delete salesman._id;
			await salesmanService.update(db, salesman.sid, salesman);
		}
	}

	return salesmen;
}

/**
 * returns all bonussalaries
 * @param db target database
 * @return {Promise<Bonussalary[]>}
 */
exports.getAll = async function (db) {
	return await db.collection(COLLECTIONS.BONUSSALARIES).find().sort({sid: 1, year: 1}).toArray();
}

/**
 * returns all bonussalaries
 * @param db target database
 * @param sid number
 * @return {Promise<Bonussalary[]>}
 */
exports.getAllBySid = async function (db, sid) {
	return await db.collection(COLLECTIONS.BONUSSALARIES).find({sid: sid}).sort({sid: 1, year: 1}).toArray();
}

/**
 * returns bonussalary by Sid and Year
 * @param sid number
 * @param db target database
 * @param year number
 * @return {Promise<Bonussalary>}
 */
exports.getBonussalary = async function (db, sid, year) {
	const filter = {
		"sid": sid,
		"year": year
	};

	return (await db.collection(COLLECTIONS.BONUSSALARIES).findOne(filter));
}

/**
 * adds Bonussalary in OrangeHRM
 * @param sid number
 * @param value number
 * @param year number
 * @return {Promise<void>}
 */
exports.confirmBonussalary = async function (sid, year, value) {

	const formData = new FormData();
	formData.append('value', value)
	formData.append('year', year)

	try {
		await axios.post(
			`${ORANGE_BASE_URL}/symfony/web/index.php/api/v1/employee/${sid}/bonussalary`,
			formData,
			{
				headers: {
					'Authorization': `Bearer ${await authenticate()}`,
					...formData.getHeaders()
				}
			}
		)
	} catch (error) {
		console.log(error)
	}
}

/**
 * inserts Bonussalary into MongoDB
 * @param  bonussalary Bonussalary
 * @param db target database
 * @return {Promise<void>}
 */
exports.addBonussalary = async function (db, bonussalary) {
	return (await db.collection(COLLECTIONS.BONUSSALARIES).insertOne(bonussalary)).insertedId; //return unique ID
}

/**
 * updates Bonussalary in MongoDB
 * @param  bonussalary Bonussalary
 * @param db target database
 * @return {Promise<void>}
 */
exports.updateBonussalary = async function (db, bonussalary) {
	const filter = {
		"sid": bonussalary.sid,
		"year": bonussalary.year
	};
	const newValues = {$set: bonussalary};

	db.collection(COLLECTIONS.BONUSSALARIES).updateOne(
		filter,
		newValues,
		function (err, _) {
			if (err) throw err;
		}
	);
}
