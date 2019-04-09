//TEST TEST TTEST TEST TEST TEST TEAST TEST TREST TEST TEST TEST TEST

var top = new Object();
var jeans = new Object();
var tracksuit = new Object();
var jumper = new Object();


top.url = "C:/Source/UniDur/IX_Clothing/client/resources/Top_Image.jpg";
jeans.url = "C:/Source/UniDur/IX_Clothing/client/resources/Jeans_Image.jpg";
tracksuit.url = "C:/Source/UniDur/IX_Clothing/client/resources/Tracksuit_Image.jpg";
jumper.url = "C:/Source/UniDur/IX_Clothing/client/resources/masthead_img.jpg";

top.price = 55;
jeans.price = 60;
tracksuit.price = 65;
jumper.price = 70;

top.description = "lorem ipsum";
jeans.description = "lorem ipsum1";
tracksuit.description = "lorem ipsum2";
jumper.description = "lorem ipsum3";


var topList = [top, top, top, top, top, top, top, top];
var jeansList = [jeans, jeans, jeans, jeans, jeans, jeans];

function changeClothingCat(choice){
	var element = document.getElementById("clothingContainer");
	element.innerHTML = "shit fucjk";
	if (choice == "Top") {
		element.innerHTML = populateGrid(topList);
		return;
	}
	if (choice == "Jeans") {
		element.innerHTML = populateGrid(jeansList);
		return;
	}
	if (choice == "Tracksuit") {
		element.innerHTML = "Sorry Buddy";
		return;
	}

	return;
}

function populateGrid(clothList) {
	var htmlStr = "";
	// var part1;
	// part1 = "<div class=\"col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3\"> 	<div class=\"row text-center\" style=\"background-color: rgb(190, 190, 216);\">  <div class=\"col\" style=\"background-color: rgb(95, 236, 236);\">	<img src=\"resources/Jeans_Image.jpg\" class=\"img-fluid img-thumbnail\" alt=\"Responsive image\">	</div>	<div class=\"w-100\"></div>			<div class=\"col\" style=\"background-color: rgb(221, 235, 146);\">price</div>		<div class=\"w-100\"></div>			<div class=\"col\" style=\"background-color: rgb(240, 138, 54);\">desc</div>	</div>	</div>";

	clothList.forEach(function(c) {
		var section = "<div class=\"col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3\"> 	<div class=\"row text-center\" style=\"background-color: rgb(190, 190, 216);\">  <div class=\"col\" style=\"background-color: rgb(95, 236, 236);\">	<img src=\"" + c.url + "\" class=\"img-fluid img-thumbnail\" alt=\"Responsive image\">	</div>	<div class=\"w-100\"></div>			<div class=\"col\" style=\"background-color: rgb(221, 235, 146);\"> "+ c.price + "</div>		<div class=\"w-100\"></div>			<div class=\"col\" style=\"background-color: rgb(240, 138, 54);\">"+ c.description +"</div>	</div>	</div>";

		htmlStr = htmlStr + section;
	});

	return htmlStr;
}