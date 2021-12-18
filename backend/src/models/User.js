/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {string} username
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} password
 * @param {string} role //HR , SM , ADMIN
 * @param {number} sid
 */
class User {
    constructor(username, firstname, lastname, email, password, role, sid = 0) {
        this._id = undefined;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
        this.sid = sid;
    }
}

module.exports = User;
