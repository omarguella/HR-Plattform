/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {number} sid
 * @param {number} year
 * @param {number} targetValue
 * @param {number} actualValue
 * @param {string} description

 */
class EvaluationRecord{
    constructor(sid, year, targetValue, actualValue,description) {
        this._id = undefined;
        this.sid = sid;
        this.year = year;
        this.targetValue = targetValue;
        this.actualValue = actualValue;
        this.description = description;

    }
}
module.exports = EvaluationRecord;
