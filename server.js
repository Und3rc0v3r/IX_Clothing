var express = require("express");
var recipes = require("./recipies.json");
var app = express();

app.get("/", function (req, resp) {
	resp.send("Hello world");
});

app.get("/food", function (req, resp) {
	resp.send(recipes);
});

app.listen(8090);