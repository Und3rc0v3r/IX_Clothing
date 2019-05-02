
const express = require("express");
const app = express();

const fetch = require("node-fetch");

const login = require("./login");

var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("client"));

var clothing = require("./client/clothing.json");


var gallerytemp = JSON.stringify(require("./client/gallery.json"));

var gallery = JSON.parse(gallerytemp);

var itemTypes = [{ "display_name": "Tops", "id": "top" }, { "display_name": "Jeans", "id": "jeans" }, { "display_name": "Jumpers", "id": "jumpers" }];


/**
 * @api {get} /itemtypes Requests item types (for dropdowns)
 * @apiName itemtypes
 * @apiGroup Types
 *
 * @apiSuccess {Array} body	This is an array of itemTypes
 * @apiSuccess {Object}	body.itemType	itemType object, it would be returned as body[0]
 * @apiSuccess {String} body.itemType.display_name	The client-side display name of the item
 * @apiSuccess {String} body.itemType.id	The server-side identifer for the item type in relation to clothes
 */
app.get("/itemtypes", function (req, resp) {
	resp.setHeader("Content-type", "application/json");
	resp.send(itemTypes);
});


/**
 * @api {get} /allclothing Requests whole clothing list
 * @apiName AllClothing
 * @apiGroup Clothing
 * @apiSuccess {Array} body	This is an array of clothes
 * @apiSuccess {Object} body.item	This is a clothing item, it would be returned as body[0]
 * @apiSuccess {Number} body.item.id	Item id for reference
 * @apiSuccess {String} body.item.name	Displayname for the cloting item
 * @apiSuccess {String} body.item.type	Server-side type designation (relates to itemtype)
 * @apiSuccess {String} body.item.url	Image url
 * @apiSuccess {String} body.item.description	Description of clothing item
 * @apiSuccess {String} body.item.price	The cost of the item
 */
app.get("/allclothing", function (req, resp) {
	resp.send(clothing);
});


/**
 * @api {get} /clothing?type=[type] Requests specfic type of clothing
 * @apiName Clothing
 * @apiGroup Clothing
 * 
 * @apiParam {string} type	id from itemType passed back
 * 
 * @apiSuccess {List} body	This is an array of clothes
 * 
 * @apiSuccess {Objects} body.item	ItemType object
 * 
 * @apiSuccess {Number} body.item.id
 * @apiSuccess {String} body.item.name
 * @apiSuccess {String} body.item.type
 * @apiSuccess {String} body.item.url
 * @apiSuccess {String} body.item.description
 * @apiSuccess {String} body.item.price
 * 
 * @apiError BadRequest Status 400 - Bad Request
 * @apiError InternalServerError Status 500 - Internal Server Error
 */
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


/**
 * @api {get} /gallery Requests gallery
 * @apiName Gallery
 * @apiGroup Gallery
 * 
 * 
 * 
 * @apiSuccess {List} body	This is a list of gallery items
 * @apiSuccess {Object} body.i	This is the gallery item object
 * @apiSuccess {Number} body.i.id - The item Id
 * @apiSuccess {Array} body.i.items_worn - Array of Items worn in the pictures
 * @apiSuccess {Array} body.i.items_worn.i - Array of Items worn in the pictures
 * @apiSuccess {String} body.i.items_worn.i.url - The url of the image
 * @apiSuccess {String} body.i.items_worn.i.description - The item description
 * 
 * @apiError BadRequest Status 400 - Bad Request
 */
app.get("/gallery", function (req, resp) {
	resp.send(gallery);
});


/**
 * @api {post} /addgalleryitem Posts gallery item to the server
 * @apiName AddGalleryItem
 * @apiGroup Gallery
 * @apiHeader (Authorization) {String} Bearer-[GoogleToken] this is the google id token passed back for verification
 * 
 * @apiParam {Object} item	This is the gallery item object
 * @apiParam {Number} item.id - The item Id
 * @apiParam {Array} item.items_worn - Array of Items worn in the pictures
 * @apiParam {object} item.items_worn.i - Items worn object
 * @apiParam {String} item.items_worn.i.url - The url of the image
 * @apiParam {String} item.items_worn.i.description - The item description
 * 
 * @apiSuccess {String} status	200 - 299 (success status)
 * @apiSuccess {Error} error	If any was thrown but still acceptable
 * @apiSuccess {Bool} ok	true - post success
 * 
 * @apiError {String} status	400s & 500s (fail status)
 * @apiError {Error} error	f any was thrown but still acceptable
 * @apiError {Bool} ok	false - post failure
 * 
 */
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