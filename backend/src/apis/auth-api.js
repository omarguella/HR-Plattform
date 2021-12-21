const userService = require('../services/user-service');
const authService = require('../services/auth-service');
const Credentials = require("../models/Credentials");

/**
 * endpoint, which handles login
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.login = function (req, res){
    const db = req.app.get('db');//get database from express
    const credentials = new Credentials(req.body.username, req.body.password);
    userService.verify(db, credentials).then(user=> { //verify credentials via user-service
        authService.authenticate(req.session, user); //mark session as authenticated
        res.send('login successful');
    }).catch(_=>{
        res.status(401).send('login failed');
    })

    // #swagger.tags = ['Login']
}

/**
 * endpoint, which handles logout
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.logout = function (req, res){
    authService.deAuthenticate(req.session); //destroy session
    res.send('logout successful');

    // #swagger.tags = ['Login']
}

/**
 * endpoint, which returns whether a user is authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.isLoggedIn = function (req, res){
    if(authService.isAuthenticated(req.session)){ //check via auth-service
        res.send({loggedIn: true});
    }else {
        res.send({loggedIn: false});
    }

    // #swagger.tags = ['Login']
}
