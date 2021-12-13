const express = require('express');
const router = express.Router();
const {
    checkAuthorization
} = require('../middlewares/auth-middleware');
const cors = require('cors')

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', checkAuthorization(false), authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.route("/user")
    .get(checkAuthorization(false), userApi.getAll)
    .post(checkAuthorization(true), userApi.create)
router.route("/user/:username")
    .get(checkAuthorization(false), userApi.getOne)
    .put(checkAuthorization(false), userApi.update)
    .delete(checkAuthorization(false), userApi.delete)

//.get(checkAuthorization(false), userApi.getSelf)

module.exports = router;

const salesmanApi = require('../apis/salesman-api');
router.route("/salesman")
    .get(checkAuthorization(true), salesmanApi.getAll)
    .post(checkAuthorization(true), salesmanApi.create)
router.route("/salesman/:sid")
    .get(checkAuthorization(true), salesmanApi.getBySid)
    .put(checkAuthorization(true), salesmanApi.updateBySid)
    .delete(checkAuthorization(true), salesmanApi.deleteBySid)

const socialRecordApi = require('../apis/socialRecord-api');
router.route("/socialrecord")
    .get(checkAuthorization(true), socialRecordApi.getAll)
    .post(checkAuthorization(true), socialRecordApi.create)
router.route("/socialrecord/:id")
    .get(checkAuthorization(true), socialRecordApi.getById)
    .put(checkAuthorization(true), socialRecordApi.update)
    .delete(checkAuthorization(true), socialRecordApi.deleteById)
router.route("/socialrecord/:sid/:year")
    .get(checkAuthorization(true), socialRecordApi.getBySidAndYear)
    .delete(checkAuthorization(true), socialRecordApi.deleteBySidAndYear)

const orangeHrmApi = require('../apis/orange-hrm-api');
router.route('/orangehrm')
    .get(checkAuthorization(true), orangeHrmApi.synchronize)
    .post(checkAuthorization(true), orangeHrmApi.bonusSalary)

const productApi = require('../apis/product-api');
router.get('/opencrx/product', checkAuthorization(true), productApi.getAll);
router.get('/opencrx/product/:id', checkAuthorization(true), productApi.getById);

const customerApi = require('../apis/customer-api');
router.get('/opencrx/customer', checkAuthorization(true), customerApi.getAll)
router.get('/opencrx/customer/:id', checkAuthorization(true), customerApi.getById)

const orderApi = require('../apis/order-api');
router.get('/opencrx/order', checkAuthorization(true), orderApi.getAll)