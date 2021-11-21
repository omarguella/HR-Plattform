const evaluationRecordService = require('../services/evaluationRecord-service');
const EvaluationRecord = require("../models/evaluationRecord");

/**
 * endpoint, which returns all evaluation services
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
    const db = req.app.get('db');
    res.json(await evaluationRecordService.get(db));
}

/**
 * endpoint, which returns
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
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getBySidAndYear = async function (req, res) {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.sid);
    const evaluationRecord = await evaluationRecordService.getBySidAndYear(db, sid,year);

    if (evaluationRecord == null) {
        res.status(404).send();
    } else {
        res.json(evaluationRecord);
    }

}

/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.create = async function (req, res) {
    const db = req.app.get('db');
    const newEvaluationRecord =new EvaluationRecord(
         parseInt(req.body.sid),
         parseInt(req.body.year),
         parseInt(req.body.targetValue),
        parseInt(req.body.actualValue),
        req.body.description
);

    const _s = await evaluationRecordService.getBySidAndYear(db, newEvaluationRecord.sid,newEvaluationRecord.year);

    if (_s !== null) {
        res.status(400).send("find the same with sid and year ");
    } else {
        const id = await evaluationRecordService.create(db, newEvaluationRecord );
        res.status(201).send(`created new evaluationRecord with id: ${id}  `)
    }
}

/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.update = async function (req, res) {
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const db = req.app.get('db');
    const newEvaluationRecord =new EvaluationRecord(
        parseInt(req.body.sid),
        parseInt(req.body.year),
        parseInt(req.body.targetValue),
        parseInt(req.body.actualValue),
        req.body.description
    );
    try {
        await evaluationRecordService.update(db, sid,year, evaluationRecord);
        res.send("evaluationRecord is updated");
    } catch (err) {
        res.status(400).send("errr");
    }

}

/**
 * endpoint, which returns information about the user, which is currently authenticated
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
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteBySidAndYear = async function (req, res) {
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const db = req.app.get('db');
    const evaluationRecord = await evaluationRecordService.getBySidAndYear(db, sid,year);
    if (evaluationRecord != null) {
        await evaluationRecordService.deleteBySidAndYear(db, sid,year);
        res.status(203).send("salesman is deleted");

    } else {
        res.send("salesman not found");
    }
}
