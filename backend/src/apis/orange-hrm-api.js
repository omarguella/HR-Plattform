const orangeHrmService = require('../services/orange-hrm-service');
const Bonussalary = require("../models/Bonussalary");

exports.synchronize = async function(req, res) {
	const db = req.app.get('db');
	await orangeHrmService.synchronizeSalesmen(db);
	res.json({success: true});

	// #swagger.tags = ['OrangeHRM']
}

exports.getAllBonussalaries = async function(req, res) {
	const db = req.app.get('db');
	const result = await orangeHrmService.getAll(db);
	res.json(result);

	// #swagger.tags = ['OrangeHRM']
}

exports.getAllBySid = async function(req, res) {
	const db = req.app.get('db');
	const sid = parseInt(req.params.sid);
	const result = await orangeHrmService.getAllBySid(db, sid);
	res.json(result);

	// #swagger.tags = ['OrangeHRM']
}

exports.confirmBonussalary = async function(req, res) {
	const db = req.app.get('db');
	const {sid, year, value} = req.body;
	if (!sid || !year || !value) {
		res.status(400).json({success: false});
		return;
	}

	const _bs = await orangeHrmService.getBonussalary(db, sid, year);
	if (!_bs) {
		return res.status(404).json({message: "No Records found"});
	}
	_bs.isOpen = false;
	orangeHrmService.updateBonussalary(db, _bs); // update status to closed in MongDB
	orangeHrmService.confirmBonussalary(sid, year, value); // update values in orangeHRM
	res.json({success: true});

	// #swagger.tags = ['OrangeHRM']
}

exports.addBonussalary = async function(req, res) {
	const db = req.app.get('db');
	const {sid, year, value, remarks} = req.body;
	if (!sid || !year || !value) {
		res.status(400).json({success: false});
		return;
	}
	const _bs = await orangeHrmService.getBonussalary(db, sid, year);
	// if Bonussalary exists it is gonna be updated
	if (!_bs) {
		orangeHrmService.addBonussalary(db, new Bonussalary(sid, year, value, remarks, true));
	} else {
		orangeHrmService.updateBonussalary(db, new Bonussalary(sid, year, value, remarks, true));
	}

	res.json({success: true});

	// #swagger.tags = ['OrangeHRM']
}
