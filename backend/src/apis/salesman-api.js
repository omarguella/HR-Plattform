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
    res.status(404).send();
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
  const newSalesman = req.body;
  const _s = await salesmanService.getBySid(db, newSalesman.sid);

  if (_s !== null) {
    res.status(400).send("sid already exists");
  } else {
    const id = await salesmanService.create(db, newSalesman);
    res.status(201).send(`created new Salesman with id: ${id}`)
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

  try {
    await salesmanService.update(db, sid, updatedValues);
    res.send("salesman is updated");
  } catch (error) {
    res.status(400).send("something went wrong!");
  }

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
    res.status(203).send("salesman is deleted");
  } else {
    res.send("salesman not found");
  }

}
