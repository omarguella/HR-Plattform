const axios = require("axios");

const ORANGE_BASE_URL = "https://sepp-hrm.inf.h-brs.de";
const ORANGE_CONFIG = {
	client_id: "api_oauth_id",
	client_secret: "oauth_secret",
	grant_type: "password",
	username: "khemissi",
	password: "*Safb02da42Demo$",
};

async function authenticate() {
	try {
		const res = await axios.post(
			`${ORANGE_BASE_URL}/symfony/web/index.php/oauth/issueToken`,
			ORANGE_CONFIG
		);

		const {
			data: {access_token},
		} = res;

		return access_token;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {ORANGE_BASE_URL, authenticate};
