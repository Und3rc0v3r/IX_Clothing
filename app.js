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

app.get("/itemtypes", function (req, resp) {
	resp.setHeader("Content-type", "application/json");
	resp.send(itemTypes);
});

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

	// console.log(token);
	// console.log(newItem);
	//console.log(newItem.id);
	//console.log(newItem);
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