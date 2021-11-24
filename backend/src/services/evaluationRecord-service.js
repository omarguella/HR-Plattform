/**
 * finds all in the database stored Evaluation Records
 * @param db target database
 * @return {Promise<EvaluationRecord[]>}
 */
exports.get = async function (db) {
    return (await db.collection('evaluationRecords').find().toArray());
}

/**
 * finds all in the database stored Evaluation Records for one Salesman
 * @param db target database
 * @param {number} sid
 * @return {Promise<EvaluationRecord[]>}
 */
exports.getBySid = async function (db, sid) {
    return (await db.collection('evaluationRecords').find({
        "sid": sid
    }).toArray());
}

/**
 *  finds all Evaluation Records for one Salesman from the same year
 * @param db target database
 * @param {number} sid
 * @param {number} year
 * @return {Promise<EvaluationRecord[]>}
 */
exports.getBySidAndYear = async function (db, sid, year) {
    return (await db.collection('evaluationRecords').find({
        "sid": sid,
        "year": year
    }).toArray());
}

/**
 *  finds a unique Evaluation Record
 * @param db target database
 * @param {string} id
 * @return {Promise<EvaluationRecord>}
 */
exports.getById = async function (db, id) {
    return (await db.collection('evaluationRecords').find({
        "_id": id,
    }));
}

/**
 * creates a new Evaluation record for a Salesman
 * @param db target database
 * @param {EvaluationRecord} evaluationRecord
 * @return {Promise<EvaluationRecord>}
 */
exports.create = async function (db, evaluationRecord) {
    return (await db.collection('evaluationRecords').insertOne(evaluationRecord)).insertedId; //return unique ID
}

/**
 * updates a unique Evaluation Record by SID and Year
 * @param db target database
 * @param {string} id
 * @param {EvaluationRecord} evaluationRecord
 * @return {Promise<EvaluationRecord>}
 */
exports.update = async function (db, id, evaluationRecord) {
    const filter = {
        "_id": id,
    };
    const newValues = {$set: evaluationRecord};
    db.collection('evaluationRecords').updateOne(
        filter,
        newValues,
        function (err, res) {
            if (err) throw err;
        });
}

/**
 * removes all Evaluation Records of one Salesman
 * @param db target database
 * @param {number} sid
 * @return {Promise<void>}
 */
exports.deleteAllBySid = async function (db, sid) {
    const filter = {
        "sid": sid
    };
    db.collection('evaluationRecords').deleteMany(filter);
}

/**
 * removes Many Evaluation Record of one Salesman from the same year
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
    db.collection('evaluationRecords').deleteMany(filter);
}

/**
 * removes one Evaluation Record of one Salesman
 * @param db target database
 * @param {string} id
 * @return {Promise<void>}
 */
exports.deleteById = async function (db, id) {
    const filter = {"_id": id};
    db.collection('evaluationRecords').deleteOne(filter);
}




