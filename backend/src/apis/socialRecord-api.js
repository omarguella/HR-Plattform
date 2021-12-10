const socialRecordService = require('../services/socialRecord-service');
const SocialRecord = require("../models/SocialRecord");

/**
 * endpoint, which returns all SocialRecords (or all for one Salesman)
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
    const sid = parseInt(req.query.sid);
    const db = req.app.get('db');
    const result = await socialRecordService.get(db);

    if (!sid) {
        res.json(result);
    } else {
        res.json(result.filter((sr) => sr.sid === sid));
    }

}

/**
 * endpoint, which returns all SocialRecords of one Salesman
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getBySid = async function (req, res) {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const SocialRecords = await socialRecordService.getBySid(db, sid);

    res.json(SocialRecords);
}

/**
 * endpoint, which returns all SocialRecord of one salesman from the same year
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getBySidAndYear = async function (req, res) {
    const db = req.app.get('db');
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const SocialRecords = await socialRecordService.getBySidAndYear(db, sid, year);

    res.json(SocialRecords);
}

/**
 * endpoint, which returns unique SocialRecord of one salesman
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getById = async function (req, res) {
    const db = req.app.get('db');
    const _id = req.params.id
    const SocialRecord = await socialRecordService.getById(db, _id);
    console.log(SocialRecord)
    console.log(_id)
    if (SocialRecord) {
        res.json(SocialRecord);
    } else {
        res.status(404).send()
    }
}

/**
 * endpoint, to create a new SocialRecord
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.create = async function (req, res) {
    const db = req.app.get('db');

    const {description, sid, year, targetValue, actualValue, bonus, comment, isClosed} = req.body;
    const newSocialRecord = new SocialRecord(
        description,
        sid,
        year,
        targetValue,
        actualValue,
        bonus,
        comment,
        isClosed
    );

    const id = await socialRecordService.create(db, newSocialRecord);
    res.status(201).send(`created new SocialRecord with id: ${id}`)
}

/**
 * endpoint, to update an existing SocialRecord
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.update = async function (req, res) {
    const _id = req.params.id;
    const db = req.app.get('db');
    const newSocialRecord = req.body;

    const _sr = await socialRecordService.getById(db, _id);

    if(!_sr) {
        res.status(404).send()
    } else {
        await socialRecordService.update(db, _id, newSocialRecord);
        res.send("SocialRecord is updated");
    }


}

/**
 * endpoint, to delete all socialRecords for the given SID
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteAllBySid = async function (req, res) {
    const sid = parseInt(req.params.sid);
    const db = req.app.get('db');
    await socialRecordService.deleteAllBySid(db, sid);
    res.send("SocialRecords for " + sid + " are deleted");

}

/**
 * endpoint, to delete all SocialRecords for the given SID and year
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteBySidAndYear = async function (req, res) {
    const sid = parseInt(req.params.sid);
    const year = parseInt(req.params.year);
    const db = req.app.get('db');
    await socialRecordService.deleteBySidAndYear(db, sid, year);
    res.send("SocialRecords for " + sid + " are deleted");
}

/**
 * endpoint, to delete unique SocialRecord
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.deleteById = async function (req, res) {
    const _id = req.params.id;
    const db = req.app.get('db');

    const _sr = await socialRecordService.getById(db, _id);

    if (_sr !== null) {
        console.log(await socialRecordService.deleteById(db, _id));
        res.status(200).send({message: 'Social Record deleted'});
    } else {
        res.status(404).send({message: 'Social Record not found'});
    }
}
