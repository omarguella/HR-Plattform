const express = require('express');
const router = express.Router();
const {checkAuthorization} = require('../middlewares/auth-middleware');

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
router.post('/salesman', checkAuthorization(true), salesmanApi.create);
router.get('/salesman', checkAuthorization(false),salesmanApi.getAll);
router.get('/salesman/:sid', checkAuthorization(false),salesmanApi.getBySid);
router.put('/salesman/:sid', checkAuthorization(false),salesmanApi.updateBySid);
router.delete('/salesman/:sid', checkAuthorization(false),salesmanApi.deleteBySid);


const evaluationRecordApi = require('../apis/evaluationRecord-api');
router.post('/evaluationRecord', checkAuthorization(true), evaluationRecordApi.create);
router.get('/evaluationRecord', checkAuthorization(false),evaluationRecordApi.getAll);
router.get('/evaluationRecord/:sid', checkAuthorization(false),evaluationRecordApi.getBySid);
router.get('/evaluationRecord/:sid/:year', checkAuthorization(false),evaluationRecordApi.getBySidAndYear);
router.put('/evaluationRecord/:sid/:year', checkAuthorization(false),evaluationRecordApi.update);
router.delete('/evaluationRecord/:sid', checkAuthorization(false),evaluationRecordApi.deleteAllBySid);
router.delete('/evaluationRecord/:sid/:year', checkAuthorization(false),evaluationRecordApi.deleteBySidAndYear);

