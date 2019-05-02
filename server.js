//Development Branch
/**
 * The server js file
 * 
 * 
 * @const {javascript} app - This just links the server to the app.js where the magic is happening
 */
const app = require("./app");

/**
 * Listening function on the pot 8090 or the listen one for cloud depployment
 *
 * @param {number} portNumber - Either 8090 or specfied by heroku
 */
app.listen(process.env.PORT || 8090);