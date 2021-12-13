const userService = require('../services/user-service');
const user = require("../models/User");

/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getSelf = async function (req, res) {
    res.send(req.session.user); //retrieve userdata of authenticated user from session and return it
}


/**
 * endpoint, which returns all users
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getAll = async function (req, res) {
    const db = req.app.get('db');
    res.json(await userService.getAll(db));
}


/**
 * endpoint, which returns an user by his username
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getOne = async function (req, res) {
    const db = req.app.get('db');
    const uid = parseInt(req.params.uid);
    const user = await userService.get(db, uid);

    if (user == null) {
        res.status(404).json({
            message: 'user not found'
        });
    } else {
        res.json(user);
    }

}


/**
 * endpoint, to create a User
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.create = async function (req, res) {
    const db = req.app.get('db');
    /* todo body validation */
    const uid = await arrangUsersID(db);
    const {
        username,
        firstname,
        lastname,
        email,
        password,
        isAdmin
    } = req.body;

    const newUser = new user(
        uid,
        username,
        firstname,
        lastname,
        email,
        password,
        isAdmin);

    const _u = await userService.get(db, newUser.uid);

    if (_u !== null) {
        res.status(400).json({
            message: 'User already exists'
        });
    } else {
        await userService.add(db, newUser);
        res.status(201).json(await userService.get(db, newUser.uid))
    }
}

/**
 * endpoint, to update User by his unique username
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.update = async function (req, res) {
    const uid = parseInt(req.params.uid);
    const db = req.app.get('db');
    const updatedValues = req.body;
    delete(updatedValues._id); // prevent updating the _id property

    const _u = await userService.get(db, uid);
    if (!_u) {
        res.status(404).json({
            message: 'User not found'
        });
        return;
    }
    await userService.update(db, uid, updatedValues);
    res.status(200).json(updatedValues)
}

/**
 * endpoint, to delete user
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.delete = async function (req, res) {
    const uid = parseInt(req.params.uid);
    const db = req.app.get('db');
    const user = await userService.get(db, uid);
    if (user != null) {
        await userService.delete(db, uid);
        res.status(200).json(user);
    } else {
        res.status(404).json({
            message: 'User not found'
        })
    }
}


/**
 * arrange ID for Users 
 * @return {Promise<number>} newUid user ID
 * @param db db
 */
async function arrangUsersID(db) {
    const users = await userService.getAll(db);
    //give the first disponible uid for a User 
    users.sort(function (a, b) {
        return a.uid - b.uid;
    });
    for (var i = 0; i < users.length - 1; i++) {
        if (users[i + 1].uid - users[i].uid > 1) {
            break;
        }
    }
    if (users.length == 0) {
        var newUid = 1;
    } else {
        var newUid = i + 2;
    }
    //console.log(newUid);

    return newUid;

}