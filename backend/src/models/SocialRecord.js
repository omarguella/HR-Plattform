/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {string} description
 * @param {number} sid
 * @param {number} year
 * @param {number} targetValue
 * @param {number} actualValue
 * @param {number} bonus
 * @param {string} comment
 * @param {boolean} isClosed
 */
class SocialRecord {
    constructor(description, sid, year, targetValue, actualValue, bonus, comment, isClosed = false) {
        this._id = undefined;
        this.description = description;
        this.sid = sid;
        this.year = year;
        this.targetValue = targetValue;
        this.actualValue = actualValue;
        this.bonus = bonus
        this.comment = comment;
        this.isClosed = isClosed;
    }
}
module.exports = SocialRecord;
