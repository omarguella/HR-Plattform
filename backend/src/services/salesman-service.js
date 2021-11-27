/**
 * gives All in the database stored Salesmen back
 * @param db target database
 * @return {Promise<Salesman[]>}
 */
exports.get = async function (db) {
    return (await db.collection('salesmen').find().toArray());
}

/**
 * gives a unique Salesman back
 * @param db target database
 * @param {number} sid
 * @return {Promise<Salesman>}
 */
exports.getBySid = async function (db, sid) {
    return (await db.collection('salesmen').findOne({
        "sid": sid
    }));
}

/**
 * inserts a new salesman into database
 * @param db target database
 * @param {Salesman} salesman
 * @return {Promise<string>}
 */
exports.create = async function (db, salesman) {
    return (await db.collection('salesmen').insertOne(salesman)).insertedId; //return unique ID
}

/**
 * updates a unique salesman by sid
 * @param db target database
 * @param {number} sid
 * @param {Salesman} salesman
 * @return {Promise<Salesman>}
 */
exports.update = async function (db, sid, salesman) {

    const filter = {
        "sid": sid
    };
    const newValues = {$set: salesman};

    db.collection('salesmen').updateOne(
        filter,
        newValues,
        function (err, res) {
            if (err) throw err;
        });
}

/**
 * removes salesman permanently from database
 * @param db target database
 * @param {number} sid
 * @return {Promise<void>}
 */

exports.delete = async function (db, sid) {
    const filter = {
        "sid": sid
    };
    db.collection('salesmen').deleteOne(filter);

}




