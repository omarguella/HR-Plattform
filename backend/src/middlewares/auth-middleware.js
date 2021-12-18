/**
 * this express middleware checks if a user is authenticated or even has admin permissions;
 * otherwise the request gets intercepted and status 401 is returned
 * @param {Array<string>} roles if true, user needs to be admin
 * @return {(function(*, *, *): void)|*}
 */
const {ROLES} = require("../utils/globals");
exports.checkAuthorization = (roles = [ROLES.ADMIN, ROLES.HR, ROLES.SALESMAN]) => {
	return (req, res, next) => {
		if (req.session.authenticated) { //check if session was marked as authenticated
			const role = req.session.user.role;
			if (roles.includes(role)) { //check if admin-requirement is met
				next(); //proceed with next middleware or handler
				return;
			}
		}
		res.status(401).send(); //intercept request
	}
}
