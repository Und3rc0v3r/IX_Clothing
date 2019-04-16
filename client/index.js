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

var gallery = {
	imgUrl: "resources/Gallery_img1.jpg",
	itmsWorn: [{ "name": "", "type": "" }]
};
var first, second, third;
first = gallery;
second = gallery;
third = gallery;

first.itmsWorn[0].name = "First";
first.itmsWorn[0].type = "Top";
second.itmsWorn[0].name = "Second";
second.itmsWorn[0].type = "Jeans";
third.itmsWorn[0].name = "Third";
third.itmsWorn[0].type = "Trackkies";

var galleryList = [first, second, third];

//window.onload = populateCarousel(galleryList);

function changeClothingCat(choice) {
	var element = document.getElementById("clothingContainer");
	element.innerHTML = "shit fucjk";

	//the following cases check what the passed param is and changes the content of the section based on that
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
	// here I dynamincally create the innerhtml of the element by looping through the json data and creating a clothing card for each object listed
	clothList.forEach(function (c) {
		var section = "<div class=\"col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3\"> 	<div class=\"row text-center\" style=\"background-color: rgb(190, 190, 216);\">  <div class=\"col\" style=\"background-color: rgb(95, 236, 236);\">	<img src=\"" + c.url + "\" class=\"img-fluid img-thumbnail\" alt=\"Responsive image\">	</div>	<div class=\"w-100\"></div>			<div class=\"col\" style=\"background-color: rgb(221, 235, 146);\"> " + c.price + "</div>		<div class=\"w-100\"></div>			<div class=\"col\" style=\"background-color: rgb(240, 138, 54);\">" + c.description + "</div>	</div>	</div>";

		htmlStr = htmlStr + section;
	});

	return htmlStr;
}

function populateCarousel(gList) {
	// var galleryImages = document.getElementById("carousel-inner");
	// var posIndicators = document.getElementById("pos-indicators");
	var galleryCount = 0;
	var rawhtml = "dum dum diddy";

	gList.forEach(function (item) {
		//TODO switch out the json stringify with a description of the item which is passed to the client side from the server
		//this bit sorts out the postioinal indicators for the carousel
		if (galleryCount == 0) {
			addElement("pos-indicators", "li", "pos" + galleryCount, "<li id=\""+"pos" + galleryCount+"\" data-target=\"#gallery-carousel\" data-slide-to=\"" + galleryCount + "\" class=\"active\"></li>");

			rawhtml = "<div class=\"carousel-item active\">	<img class=\"d-block w-100\" src=\"" + item.imgUrl + "\" alt=\"" + galleryCount + "\"> <div class=\"carousel-caption d-none d-md-block\">	<h5>" + galleryCount + "</h5>		<p>" + JSON.stringify(item.itmsWorn) + "</p>	 </div></div>";
			addElement("carousel-inner", "div", "gallery-img-"+galleryCount, rawhtml);
		}
		else {
			addElement("pos-indicators", "li", "pos" + galleryCount, "<li id=\""+"pos" + galleryCount+"\" data-target=\"#gallery-carousel\" data-slide-to=\"" + galleryCount + "\"></li>");
			rawhtml = "<div class=\"carousel-item \">	<img class=\"d-block w-100\" src=\"" + item.imgUrl + "\" alt=\"" + galleryCount + "\"> <div class=\"carousel-caption d-none d-md-block\">	<h5>" + galleryCount + "</h5>		<p>" + JSON.stringify(item.itmsWorn) + "</p>	 </div></div>";
			addElement("carousel-inner", "div", "gallery-img-"+galleryCount, rawhtml);

		}
		galleryCount = galleryCount + 1;

		//this next bit fill sin the carousel inner
	});
	///TODO I left it at basically, trying to add the posiindicators, the first indicator isn't wokirking and is causing the whole boitch to break. 
	//recomend finding out what tags can have new childs added on to them. might not be the ol tag.
}


function loadClothingSection() {
	//Loads the clothing section
	removeElement("Gallery");
	removeElement("Calendar");
	//here i have the html of the section and will pass it to the element cration function
	var rawhtml = "<section id=\"Clothing\" class=\"projects-section bg-light\" style=\"height: 100vh;\">	<div class=\"container\"> <h1> Clothing </h2> <span class=\"dropdown\"> <a class=\"dropdown-toggle btn btn-default\" data-toggle=\"dropdown\" role=\"button\"aria-haspopup=\"true\" aria-expanded=\"false\"> Clothing Type	<span class=\"caret\"> </a><ul class=\"dropdown-menu\"> <li><a href=\"#Clothing\" onclick=\'changeClothingCat(\"Top\")\'> Top </a></li><li><a href=\"#Clothing\" onclick=\'changeClothingCat(\"Jeans\")'> Jeans </a></li><li><a href=\"#Clothing\" onclick=\'changeClothingCat(\"Tracksuit\")\'> Tracksuit </a></li></ul></span><div class=\"row\" id=\"clothingContainer\"></div></div></section>";
	addElement("sections-container", "section", "Clothing", rawhtml);
}


function loadGallerySection() {
	//loads the gallery section
	removeElement("Calendar");
	removeElement("Clothing");
	populateCarousel(galleryList);

}

function loadCalendarSection() {
	//loads the calendar section
	removeElement("Clothing");
	removeElement("Gallery");

}

function removeElement(elementId) {
	//this removes specfied elements from index after checking it exists
	var element = document.getElementById(elementId);
	if (element == null) return;
	element.parentNode.removeChild(element);
}

function addElement(parentId, elementTag, elementId, html) {
	// Adds an element to the index
	var container = document.getElementById(parentId);
	var newElement = document.createElement(elementTag);
	newElement.setAttribute('id', "temp-"+elementId);
	container.appendChild(newElement);
	var createdElement = document.getElementById("temp-"+elementId);
	createdElement.outerHTML = html;
	// container.appendChild(newElement);
}

