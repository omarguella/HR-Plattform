const salesmanService = require('../services/salesman-service');
const Salesman = require("../models/Salesman");

/**
 * endpoint, which returns all salesmen
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
    const db = req.app.get('db');
    res.json(await salesmanService.get(db));
}

/**
 * endpoint, which returns Salesman by his unique SID
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getBySid = async function (req, res) {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const salesman = await salesmanService.getBySid(db, sid);

    if (salesman == null) {
        res.status(404).json({message: 'Salesman not found'});
    } else {
        res.json(salesman);
    }

}

/**
 * endpoint, to create a salesman
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.create = async function (req, res) {
    const db = req.app.get('db');
    /* todo body validation */
    const {sid, firstname, lastname, department} = req.body;
    const newSalesman = new Salesman(sid, firstname, lastname, department);

    const _s = await salesmanService.getBySid(db, newSalesman.sid);

    if (_s !== null) {
        res.status(400).json({message: 'Salesman already exists'});
    } else {
        await salesmanService.create(db, newSalesman);
        res.status(201).json(await salesmanService.getBySid(db, newSalesman.sid))
    }
}

/**
 * endpoint, to update salesman by his unique SID
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.updateBySid = async function (req, res) {
    const sid = parseInt(req.params.sid);
    const db = req.app.get('db');
    const updatedValues = req.body;
    delete(updatedValues._id); // prevent updating the _id property

    const _s = await salesmanService.getBySid(db, sid);
    if(!_s) {
        res.status(404).json({message: 'Salesman not found'});
        return;
    }

    await salesmanService.update(db, sid, updatedValues);
    res.status(200).json(updatedValues)
}

/**
 * endpoint, to delete salesman
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteBySid = async function (req, res) {
    const sid = parseInt(req.params.sid);
    const db = req.app.get('db');
    const salesman = await salesmanService.getBySid(db, sid);
    if (salesman != null) {
        await salesmanService.delete(db, sid);
        res.status(200).json(salesman);
    } else {
        res.status(404).json({message: 'Salesman not found'})
    }
}
