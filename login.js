const fetch = require("node-fetch");



async function login(token) {
	var responseObj = { "status": "", "error": "", "ok": true };
	//  Sending token off to googles external auth service
	var response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);

	responseObj.status = response.status;

	if (!response.ok) {
		//throw new Error(`HTTP error, status = ${response.status}`);
		responseObj.error = new Error(`HTTP error, status = ${response.status}`).message;
		responseObj.ok = false;
		return responseObj;

	}
	return responseObj;
}


module.exports = login;