/**
 * this model specifies the format to exchange userdata with the frontend and store it in mongoDB
 * @param {number} uid
 * @param {string} username
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} password
 * @param {boolean} isAdmin
 */
class User {
    constructor(uid, username, firstname, lastname, email, password, isAdmin) {
        this._id = undefined;
        this.uid = uid;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}

module.exports = User;