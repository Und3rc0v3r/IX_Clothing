const express = require("express");
const app = express();
const fetch = require("node-fetch");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("client"));

var clothing = require("./client/clothing.json");
var gallerytemp = JSON.stringify(require("./client/gallery.json"));
var gallery = JSON.parse(gallerytemp);

var itemTypes = [{ "display_name": "Tops", "id": "top" }, { "display_name": "Jeans", "id": "jeans" }, { "display_name": "Jumpers", "id": "jumpers" }];

app.get("/itemtypes", function (req, resp) {
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

app.post("/addgalleryitem", function (req, resp) {
	var responseObj = { "status": "", "error": "", "ok": true };
	var token = req.headers.authorization;
	var newItem = JSON.parse(req.body.item);
	// console.log(token);
	// console.log(newItem);

	console.log(newItem.id);

	newItem.id = gallery.length + 1;
	console.log(newItem);

	fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
		.then(function (response) {
			responseObj.status = response.status;
			if (!response.ok) {
				throw new Error(`HTTP error, status = ${response.status}`);
			}
			gallery.push(newItem);
			console.log(gallery);
			resp.send(responseObj);
		})
		.catch(error => {
			console.log(error);
			responseObj.error = error.message;
			responseObj.ok = false;
			resp.send(responseObj);
		});
	
	console.log(gallery);
});



module.exports = app;