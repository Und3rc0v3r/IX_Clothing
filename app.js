
const express = require("express");
const app = express();

const fetch = require("node-fetch");

/**
 * @const {javascript} login References the login js file where auth occurs
 */
const login = require("./login");

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("client"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

/**
 * Adding clothing data
 * @type {JSON} 
 */
var clothing = require("./client/clothing.json");

/**
 * A gallery object
 * @typedef {Object} GalleryItem
 * @property {number} id - The item Id
 * @property {array} items_worn - The Items worn in the pictures
 * @property {string} url - The url of the image
 * @property {string} description - The item description
 */

/**
 * Adding gallery data
 * @type {JSON} 
 */
var gallerytemp = JSON.stringify(require("./client/gallery.json"));

/**
 * The array of gallery objects
 * @type {GalleryItem[]}
 */
var gallery = JSON.parse(gallerytemp);

/**
 * Declaring & assigning the array of itemType
 * @const {itemTypes[]} itemTypes
 */
var itemTypes = [{ "display_name": "Tops", "id": "top" }, { "display_name": "Jeans", "id": "jeans" }, { "display_name": "Jumpers", "id": "jumpers" }];


/** @module GET - Get APIs **/

/**
 * itemType - /GET
 * @memberof module:GET
 * @param {Request} req - Senders Request, contains all headers/ body  etc
 * @param {Response} resp - Server-Side Response
 * @return {Response} Response with status code etc
 */
app.get("/itemtypes", function (req, resp) {
	resp.setHeader("Content-type", "application/json");
	resp.send(itemTypes);
});


/**
 * @memberof GET
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
app.get("/allclothing", function (req, resp) {
	resp.send(clothing);
});

app.get("/clothing", function (req, resp) {

	var type = req.query.type;
	if (type == undefined) {
		resp.status(400).end();
		return;
	}
	//console.log(type);
	var ClothingList = [];
	//console.log(clothing[0]);

	for (let i = 0; i < clothing.length; i++) {
		//console.log(clo);
		var x = clothing[i];
		if (x["type"].toLowerCase() == type.toLowerCase()) {
			ClothingList.push(x);
		}

	}

	if (ClothingList.length == 0) {
		resp.status(400).end();
		return;
	}
	resp.send(ClothingList);

});


app.get("/gallery", function (req, resp) {
	resp.send(gallery);
});

app.post("/addgalleryitem", async function (req, resp) {
	try {
		var newItem = JSON.parse(req.body.item);
		var token = req.headers.authorization;
	} catch (error) {
		console.log(error.messsage);
		resp.status("400").send("Bad Request");
		return;
	}
	resp.setHeader("Content-Type", "application/json");
	newItem.id = gallery.length + 1;

	let responseObj = await login(token);
	if (responseObj.ok != true) {
		resp.status(responseObj.status).send(responseObj);
		return;
	}
	else {
		gallery.push(newItem);
		resp.send(responseObj);
	}
	return;
	//console.log(gallery);
});



module.exports = app;