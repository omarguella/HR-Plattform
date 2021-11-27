const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');
const cors = require('cors')

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization(false),authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.get('/user', checkAuthorization(false), userApi.getSelf);


module.exports = router;


const salesmanApi = require('../apis/salesman-api');
router.route("/salesman")
    .get( checkAuthorization(false), salesmanApi.getAll)
    .post(checkAuthorization(true), salesmanApi.create)
router.route("/salesman/:sid")
    .get(checkAuthorization(false),salesmanApi.getBySid)
    .put(checkAuthorization(false),salesmanApi.updateBySid)
    .delete(checkAuthorization(false),salesmanApi.deleteBySid)

const socialRecordApi = require('../apis/socialRecord-api');
router.route("/socialrecord")
    .get(checkAuthorization(true),socialRecordApi.getAll)
    .post(checkAuthorization(true), socialRecordApi.create)
router.route("/socialrecord/:id")
    .get(checkAuthorization(false), socialRecordApi.getById)
    .put(checkAuthorization(true), socialRecordApi.update)
    .delete(checkAuthorization(false),socialRecordApi.deleteById)
router.route("/socialrecord/:sid/:year")
    .get(checkAuthorization(false),socialRecordApi.getBySidAndYear)
    .delete(checkAuthorization(false), socialRecordApi.deleteBySidAndYear)
