var express = require("express");
var recipes = require("./recipies.json");
var app = express();

var itemTypes = [{"type":"Tops"},{"type":"Jeans"},{"type":"Tracksuits"},{"type":"Jumpers"}]


app.get("/", function (req, resp) {
	resp.send("Hello world");
});

app.get("/food", function (req, resp) {
	resp.send(recipes);
});

app.get("/itemtypes", function (req, resp) {
	resp.send(itemTypes);
})

app.listen(8090);