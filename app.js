const express = require("express");
const app = express();
const fetch = require("node-fetch");

app.use(express.static("client"));

var clothing = require("./client/clothing.json");
var gallery = require("./client/gallery.json");

var itemTypes = [{ "display_name": "Tops", "id":"top" }, { "display_name": "Jeans", "id": "jeans" }, { "display_name": "Jumpers", "id":"jumpers" }];

app.get("/itemtypes", function (req, resp) {
	resp.send(itemTypes);
});

app.get("/allclothing", function (req, resp) {
	resp.send(clothing);
});

app.get("/clothing", function (req, resp) {
	
	var type = req.query.type;
	if (type == undefined){
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

	if (ClothingList.length == 0){
		resp.status(400).end();
		return;
	}
	resp.send(ClothingList);
	
});


app.get("/gallery", function (req, resp) {
	resp.send(gallery);
});

module.exports = app