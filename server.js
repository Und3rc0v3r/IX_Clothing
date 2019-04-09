var express = require("express");
var app = express();
app.use(express.static("client"));
var recipes = require("./client/recipies.json");
var itemTypes = [{"type":"Tops"},{"type":"Jeans"},{"type":"Tracksuits"},{"type":"Jumpers"}];
var instruments = [ 'piano', 'concertina', 'double bass'];


app.get("/", function (req, resp) {
	resp.send("Hello world");
});

app.get("/food", function (req, resp) {
	resp.send(recipes);
});

app.get("/itemtypes", function (req, resp) {
	resp.send(itemTypes);
});

app.get("/list", function (req, resp) {
	resp.send(instruments);
});

app.listen(8090);