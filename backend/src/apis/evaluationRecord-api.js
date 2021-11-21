const evaluationRecordService = require('../services/evaluationRecord-service');
const EvaluationRecord = require("../models/evaluationRecord");

/**
 * endpoint, which returns all evaluation records
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
  const db = req.app.get('db');
  res.json(await evaluationRecordService.get(db));
}

/**
 * endpoint, which returns all evaluation records of one Salesman
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getBySid = async function (req, res) {
  const db = req.app.get('db');
  const sid = parseInt(req.params.sid);
  const evaluationRecord = await evaluationRecordService.getBySid(db, sid);

  if (evaluationRecord == null) {
    res.status(404).send();
  } else {
    res.json(evaluationRecord);
  }

}

/**
 * endpoint, which returns a unique evaluation record of unique salesman
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getBySidAndYear = async function (req, res) {
  const db = req.app.get('db');
  const sid = parseInt(req.params.sid);
  const year = parseInt(req.params.sid);
  const evaluationRecord = await evaluationRecordService.getBySidAndYear(db, sid, year);

  if (evaluationRecord == null) {
    res.status(404).send();
  } else {
    res.json(evaluationRecord);
  }

}

/**
 * endpoint, to create a new evaluation record
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.create = async function (req, res) {
  const db = req.app.get('db');
  const newEvaluationRecord = new EvaluationRecord(
    parseInt(req.body.sid),
    parseInt(req.body.year),
    parseInt(req.body.targetValue),
    parseInt(req.body.actualValue),
    req.body.description
  );

  const _s = await evaluationRecordService.getBySidAndYear(db, newEvaluationRecord.sid, newEvaluationRecord.year);

  if (_s !== null) {
    res.status(400).send("An Evaluation Record with the same sid and year already exists");
  } else {
    const id = await evaluationRecordService.create(db, newEvaluationRecord);
    res.status(201).send(`created new evaluationRecord with id: ${id}  `)
  }
}

/**
 * endpoint, to update an existing evaluation record
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.update = async function (req, res) {
  const sid = parseInt(req.params.sid);
  const year = parseInt(req.params.year);
  const db = req.app.get('db');
  const newEvaluationRecord = req.body;
  try {
    await evaluationRecordService.update(db, sid, year, newEvaluationRecord);
    res.send("evaluationRecord is updated");
  } catch (err) {
    res.status(400).send()
  }

}

/**
 * endpoint, to delete all evaluation records for the given SID
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteAllBySid = async function (req, res) {
  const sid = parseInt(req.params.sid);
  const db = req.app.get('db');
  const evaluationRecord = await evaluationRecordService.getBySid(db, sid);
  if (evaluationRecord != null) {
    await evaluationRecordService.deleteAllBySid(db, sid);
    res.status(203).send("salesman is deleted");
  } else {
    res.send("salesman not found");
  }
}


/**
 * endpoint, to delete a unique evaluation record for the given SID
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteBySidAndYear = async function (req, res) {
  const sid = parseInt(req.params.sid);
  const year = parseInt(req.params.year);
  const db = req.app.get('db');
  const evaluationRecord = await evaluationRecordService.getBySidAndYear(db, sid, year);
  if (evaluationRecord != null) {
    await evaluationRecordService.deleteBySidAndYear(db, sid, year);
    res.status(203).send("salesman is deleted");
  } else {
    res.send("salesman not found");
  }
}
