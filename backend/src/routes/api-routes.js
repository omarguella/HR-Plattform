const express = require('express');
const router = express.Router();
const {
    checkAuthorization
} = require('../middlewares/auth-middleware');
const {
    ROLES
} = require("../utils/globals");

/*
    In this file is the routing for the REST-endpoints under /api managed
 */

const authApi = require('../apis/auth-api'); //api-endpoints are loaded from separate files
router.post('/login', authApi.login); //the function decides which request type should be accepted
router.delete('/login', authApi.logout); //middlewares can be defined in parameters
router.get('/login', authApi.isLoggedIn); //the function, which handles requests is specified as the last parameter

const userApi = require('../apis/user-api');
router.get("/self", userApi.getSelf)
router.route("/user")
    .get(checkAuthorization([ROLES.ADMIN]), userApi.getAll)
    .post(checkAuthorization([ROLES.ADMIN]), userApi.create)
router.route("/user/:username")
    .get(checkAuthorization([ROLES.ADMIN]), userApi.getOne)
    .put(checkAuthorization([ROLES.ADMIN]), userApi.update)
    .delete(checkAuthorization([ROLES.ADMIN]), userApi.delete)
router.route("/user/:username/password")
    .put(userApi.updatePassword)

const salesmanApi = require('../apis/salesman-api');
router.route("/salesman")
    .get(checkAuthorization([ROLES.ADMIN]), salesmanApi.getAll)
    .post(checkAuthorization([ROLES.ADMIN]), salesmanApi.create)
router.route("/salesman/:sid")
    .get(checkAuthorization([ROLES.ADMIN]), salesmanApi.getBySid)
    .put(checkAuthorization([ROLES.ADMIN]), salesmanApi.updateBySid)
    .delete(checkAuthorization([ROLES.ADMIN]), salesmanApi.deleteBySid)

const socialRecordApi = require('../apis/socialRecord-api');
router.route("/socialrecord")
    .get(checkAuthorization([ROLES.ADMIN]), socialRecordApi.getAll)
    .post(checkAuthorization([ROLES.ADMIN]), socialRecordApi.create)
router.route("/socialrecord/:id")
    .get(checkAuthorization([ROLES.ADMIN]), socialRecordApi.getById)
    .put(checkAuthorization([ROLES.ADMIN]), socialRecordApi.update)
    .delete(checkAuthorization([ROLES.ADMIN]), socialRecordApi.deleteById)
router.route("/socialrecord/:sid/:year")
    .get(checkAuthorization([ROLES.ADMIN]), socialRecordApi.getBySidAndYear)
    .delete(checkAuthorization([ROLES.ADMIN]), socialRecordApi.deleteBySidAndYear)

const orangeHrmApi = require('../apis/orange-hrm-api');
router.route('/orangehrm')
    .get(checkAuthorization([ROLES.ADMIN]), orangeHrmApi.synchronize)
    .post(checkAuthorization([ROLES.HR]), orangeHrmApi.confirmBonussalary)
router.route("/bonussalary")
    .get(checkAuthorization([ROLES.ADMIN, ROLES.HR]), orangeHrmApi.getAllBonussalaries)
    .post(checkAuthorization([ROLES.ADMIN]), orangeHrmApi.addBonussalary)
router.route("/bonussalary/:sid")
    .get(checkAuthorization(), orangeHrmApi.getAllBySid)


const productApi = require('../apis/product-api');
router.get('/opencrx/product', productApi.getAll);
router.get('/opencrx/product/:id', productApi.getById);

const customerApi = require('../apis/customer-api');
router.get('/opencrx/customer', customerApi.getAll);
router.get('/opencrx/customer/:id', customerApi.getById);

const orderApi = require('../apis/order-api');
router.get('/opencrx/order', checkAuthorization([ROLES.ADMIN, ROLES.HR]), orderApi.getAll);

module.exports = router;
