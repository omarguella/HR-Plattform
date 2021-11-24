/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {string} description
 * @param {number} sid
 * @param {number} year
 * @param {number} targetValue
 * @param {number} actualValue
 * @param {number} bonus
 * @param {string} comment
 */
class EvaluationRecord{
    constructor(description, sid, year, targetValue, actualValue, bonus, comment) {
        this._id = undefined;
        this.description = description;
        this.sid = sid;
        this.year = year;
        this.targetValue = targetValue;
        this.actualValue = actualValue;
        this.bonus = bonus
        this.comment = comment;
    }
}
module.exports = EvaluationRecord;
