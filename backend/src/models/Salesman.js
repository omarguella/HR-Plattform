/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {number} sid
 * @param {number} code
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} department
 */
class Salesman {
  constructor(sid, code, firstname, lastname, department) {
    this._id = undefined;
    this.sid = sid;
    this.code = code;
    this.firstname = firstname;
    this.lastname = lastname;
    this.department = department;
  }
}

module.exports = Salesman;
