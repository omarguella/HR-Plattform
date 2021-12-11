const {ObjectId} = require("mongodb");

/**
 * finds all in the database stored SocialRecords
 * @param db target database
 * @return {Promise<SocialRecord[]>}
 */
exports.get = async function (db) {
    return (await db.collection('socialRecords').find().toArray());
}

/**
 * finds all in the database stored SocialRecords for one Salesman
 * @param db target database
 * @param {number} sid
 * @return {Promise<SocialRecord[]>}
 */
exports.getBySid = async function (db, sid) {
    return (await db.collection('socialRecords').find({
        "sid": sid
    }).toArray());
}

/**
 *  finds all SocialRecords for one Salesman from the same year
 * @param db target database
 * @param {number} sid
 * @param {number} year
 * @return {Promise<SocialRecord[]>}
 */
exports.getBySidAndYear = async function (db, sid, year) {
    return (await db.collection('socialRecords').find({
        "sid": sid,
        "year": year
    }).toArray());
}

/**
 *  finds a unique SocialRecord
 * @param db target database
 * @param {string} id
 * @return {Promise<SocialRecord>}
 */
exports.getById = async function (db, id) {
    return (await db.collection('socialRecords').findOne({
        "_id": ObjectId(id),
    }));
}

/**
 * creates a new SocialRecord for a Salesman
 * @param db target database
 * @param {SocialRecord} socialRecord
 * @return {Promise<SocialRecord>}
 */
exports.create = async function (db, socialRecord) {
    return (await db.collection('socialRecords').insertOne(socialRecord)).insertedId; //return unique ID
}

/**
 * updates a unique SocialRecord Record _id
 * @param db target database
 * @param {string} id
 * @param {SocialRecord} socialRecord
 * @return {Promise<void>}
 */
exports.update = async function (db, id, socialRecord) {
    const filter = {
        "_id": ObjectId(id),
    };
    const newValues = {$set: socialRecord};
    await db.collection('socialRecords').updateOne(
        filter,
        newValues,
    );
}

/**
 * removes all SocialRecord of one Salesman
 * @param db target database
 * @param {number} sid
 * @return {Promise<void>}
 */
exports.deleteAllBySid = async function (db, sid) {
    const filter = {
        "sid": sid
    };
    await db.collection('socialRecords').deleteMany(filter);
}

/**
 * removes Many SocialRecord of one Salesman from the same year
 * @param db target database
 * @param {number} sid
 * @param {number} year
 * @return {Promise<void>}
 */
exports.deleteBySidAndYear = async function (db, sid, year) {
    const filter = {
        "sid": sid,
        "year": year
    };
    await db.collection('socialRecords').deleteMany(filter);
}

/**
 * removes one SocialRecord of one Salesman
 * @param db target database
 * @param {string} id
 * @return {Promise<void>}
 */
exports.deleteById = async function (db, id) {
    const filter = {"_id": ObjectId(id)};
    return (await db.collection('socialRecords').deleteOne(filter));
}




