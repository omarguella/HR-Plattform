/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {number} sid
 * @param {number} year
 * @param {number} value
 * @param {string} remarks
 * @param {boolean} isOpen
 */
class Bonussalary {
	constructor(sid, year, value, remarks, isOpen) {
		this.sid = sid;
		this.year = year;
		this.value = value;
		this.remarks = remarks;
		this.isOpen = isOpen; // if true, bonussalary needs to be confirmed by HR
	}
}

module.exports = Bonussalary;
