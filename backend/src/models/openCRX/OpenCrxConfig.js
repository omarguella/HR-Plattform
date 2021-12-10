const CRX_BASE_URL = "https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX";
const CRX_AUTH = { username: "guest", password: "guest" };
const CRX_CONFIG = {
	header: {
		Accept: "application/json",
	},
	auth: CRX_AUTH,
};

module.exports = {CRX_BASE_URL, CRX_CONFIG}
