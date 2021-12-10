const orangeHrmService = require('../services/orange-hrm-service');

exports.synchronize = async function(req, res) {
	const db = req.app.get('db');
	await orangeHrmService.synchronizeSalesmen(db);
	res.json({success: true});
}

exports.bonusSalary = async function(req, res) {
	const {sid, year, value} = req.body;
	await orangeHrmService.addBonusSalary(sid, year, value);
	res.json({success: true})
}
