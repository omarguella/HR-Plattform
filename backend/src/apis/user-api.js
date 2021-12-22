const userService = require('../services/user-service');
const user = require("../models/User");
const Credentials = require("../models/Credentials");


/**
 * endpoint, which returns information about the user, which is currently authenticated
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getSelf = async function (req, res) {
	res.json(req.session.user); //retrieve userdata of authenticated user from session and return it

	// #swagger.tags = ['User']
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

	// #swagger.tags = ['User']
}

/**
 * endpoint, which returns an user by his username
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.getOne = async function (req, res) {
	const db = req.app.get('db');
	const username = req.params.username;
	const user = await userService.get(db, username);

	if (user == null) {
		res.status(404).json({
			message: 'user not found'
		});
	} else {
		res.json(user);
	}

	// #swagger.tags = ['User']
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
	const {
		username,
		firstname,
		lastname,
		email,
		password,
		role,
		sid
	} = req.body;

	const newUser = new user(
		username,
		firstname,
		lastname,
		email,
		password,
		role,
		sid ? sid : 0
	);

	const _u = await userService.get(db, newUser.username);

	if (_u !== null) {
		res.status(400).json({
			message: 'User already exists'
		});
	} else {
		await userService.add(db, newUser);
		res.status(201).json({
			message: `created User with username ${newUser.username}`
		});
	}

	// #swagger.tags = ['User']
}

/**
 * endpoint, to delete user
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.delete = async function (req, res) {
	const username = req.params.username;
	const db = req.app.get('db');
	const user = await userService.get(db, username);
	if (user != null) {
		await userService.delete(db, username);
		res.status(200).json(user);
	} else {
		res.status(404).json({
			message: 'User not found'
		})
	}

	// #swagger.tags = ['User']

}

/**
 * endpoint, to update User by his unique username
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.update = async function (req, res) {
	const username = req.params.username;
	const db = req.app.get('db');
	const updatedValues = req.body;
	delete(updatedValues._id); // prevent updating the _id property
	delete(updatedValues.password);

	const _u = await userService.get(db, username);
	if (!_u) {
		res.status(404).json({
			message: 'User not found'
		});
		return;
	}

	await userService.update(db, username, updatedValues);
	res.status(200).json(updatedValues);

	// #swagger.tags = ['User']
}


/**
 * endpoint, to update User by his unique username
 * @param req express request
 * @param res express response
 * @return {Promise<void>}
 */
exports.updatePassword = async function (req, res) {
	Credentials.username = req.params.username;
	Credentials.password = req.body.oldPassword;

	const db = req.app.get('db');
	const newPassword = req.body.newPassword;

	try {
		const _v = await userService.verify(db, Credentials);
	} catch (error) {
		res.status(404).json({
			message: error.message
		});
		return;
	}

	await userService.updatePassword(db, Credentials.username, newPassword);
	res.status(200).json({
		message: 'Password is changed'
	});

	// #swagger.tags = ['User']
}