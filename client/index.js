/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
//TEST TEST TTEST TEST TEST TEST TEAST TEST TREST TEST TEST TEST TEST//
//This is the Dev Branch//


//Production Version
//const fetchUrl = "https://ixclothing.herokuapp.com";

//Dev & Local version
const fetchUrl = "http://localhost:8090";
let profile = null;
let profile_token = null;
let createdurl = null;
//amazon s3 shit
var albumBucketName = 'peter.student.general';
var bucketRegion = 'eu-west-2';
var IdentityPoolId = 'eu-west-2:9b04f5b5-3353-4981-94c0-ecfd5f58f524';

AWS.config.update({
	region: bucketRegion,
	credentials: new AWS.CognitoIdentityCredentials({
		IdentityPoolId: IdentityPoolId
	})
});

var s3 = new AWS.S3({
	apiVersion: '2006-03-01',
	params: { Bucket: albumBucketName }
});




function getClothingList(type) {

	return (
		fetch(`${fetchUrl}/clothing?type=${type}`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json", }
			})
			.then(function (response) {
				if (!response.ok) {
					throw new Error('HTTP error, status = ' + response.status);
				}
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				return data;
			})
			.catch(error => console.log(error))
	);

}

function getGalleryList() {

	return (
		fetch(`${fetchUrl}/gallery`,
			{
				method: "GET",
				headers: { "Content-Type": "application/json", }
			})
			.then(function (response) {
				if (!response.ok) {
					throw new Error('HTTP error, status = ' + response.status);
				}
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				return data;
			})
			.catch(error => console.log(error))
	);
}

function populateClothingDropdown() {
	fetch(`${fetchUrl}/itemtypes`)
		.then(response => response.json())
		.then(function (data) {
			var menuHtml = "<span class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle btn btn-default\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Clothing Type <span class=\"caret\"></span></a><ul class=\"dropdown-menu\">";
			for (var i = 0; i < data.length; i++) {
				menuHtml += `<li><a onclick='changeClothingCat("${data[i].id}")' href='#Clothing'> ${data[i].display_name} </a></li>`;
			}
			menuHtml += '</ul></span>';
			//document.getElementById("optionscontainer").innerHTML = menuHtml;

			addElement("optionscontainer", "span", "optionscontainer", menuHtml);

		});
}


function populateGrid(clothList) {
	var htmlStr = "";
	// here I dynamincally create the innerhtml of the element by looping through the json data and creating a clothing card for each object listed
	clothList.forEach(function (c) {
		var section = "<div class=\"col-md-3 col-sm-3 col-lg-3 col-xs-3 col-xl-3\"> 	<div class=\"row text-center\">  <div class=\"col\">	<img src=\"" + c.url + "\" class=\"img-fluid img-thumbnail\" alt=\"Responsive image\">	</div>	<div class=\"w-100\"></div>			<div class=\"col\"> £" + c.price + "</div>		<div class=\"w-100\"></div>			<div class=\"col\">" + c.description + "</div>	</div>	</div>";

		htmlStr = htmlStr + section;
	});

	return htmlStr;
}

function populateCarousel(gList) {
	var galleryCount = 0;
	var rawhtml = "No gallery images present";

	gList.forEach(function (item) {
		//TODO switch out the json stringify with a description of the item which is passed to the client side from the server
		//this bit sorts out the postioinal indicators for the carousel
		var itemsWornList;
		if (item.items_worn.length > 0) {
			itemsWornList = [item.items_worn[0]["name"], item.items_worn[1]["name"]].join(", ");
		}else{
			itemsWornList = "A Users Creation";
		}

		if (galleryCount == 0) {
			addElement("pos-indicators", "li", "pos" + galleryCount, "<li id=\"" + "pos" + galleryCount + "\" data-target=\"#gallery-carousel\" data-slide-to=\"" + galleryCount + "\" class=\"active\"></li>");

			rawhtml = `<div class="carousel-item active">	<img class="d-block w-100" src="${item.url}" alt="${galleryCount}" height="400" width="800"> <div class="carousel-caption d-none d-md-block" style="background: rgba(0, 0, 0, 0.5); border-radius: 25px;	">	<h5>${itemsWornList}</h5>		<p>${item.description}</p>	 </div></div>`;
			addElement("carousel-inner", "div", "gallery-img-" + galleryCount, rawhtml);
		}
		else {
			addElement("pos-indicators", "li", "pos" + galleryCount, "<li id=\"" + "pos" + galleryCount + "\" data-target=\"#gallery-carousel\" data-slide-to=\"" + galleryCount + "\"></li>");
			rawhtml = `<div class="carousel-item">	<img class="d-block w-100" src="${item.url}" alt="${galleryCount}" height="400" width="800"> <div class="carousel-caption d-none d-md-block" style="background: rgba(0, 0, 0, 0.5); border-radius: 25px;	">	<h5>${itemsWornList}</h5>		<p>${item.description}</p>	 </div></div>`;
			addElement("carousel-inner", "div", "gallery-img-" + galleryCount, rawhtml);

		}
		galleryCount = galleryCount + 1;

		//this next bit fill sin the carousel inner
	});
	///TODO I left it at basically, trying to add the posiindicators, the first indicator isn't wokirking and is causing the whole boitch to break. 
	//recomend finding out what tags can have new childs added on to them. might not be the ol tag.
}


function changeClothingCat(choice) {
	var element = document.getElementById("clothingContainer");
	element.innerHTML = "Unfortunately, we have none of this category onsale";
	//var clothingListPromise = getClothingList(choice);
	// getClothingList(choice).then(response => clothingList = response);
	// console.log(clothingList);
	//the following cases check what the passed param is and changes the content of the section based on that
	getClothingList(choice).then(function (clothingList) {
		// if (choice == "top") {
		element.innerHTML = populateGrid(clothingList);
		return;
		// }
		// if (choice == "jeans") {
		// 	element.innerHTML = populateGrid(jeansList);
		// 	return;
		// }
		// if (choice == "jumpers") {
		// 	element.innerHTML = "Sorry Buddy";
		// 	return;
		// }
	});
}

function loadClothingSection() {
	//Loads the clothing section
	emptySectionContainer();
	//here i have the html of the section and will pass it to the element cration function
	//var rawhtml = "<section id=\"Clothing\" class=\"projects-section bg-light\" style=\"height: 100vh; overflow: auto;\">	<div class=\"container\"> <h1> Clothing </h2> <span class=\"dropdown\"> <a class=\"dropdown-toggle btn btn-default\" data-toggle=\"dropdown\" role=\"button\"aria-haspopup=\"true\" aria-expanded=\"false\"> Clothing Type	<span class=\"caret\"> </a><ul class=\"dropdown-menu\"> <li><a href=\"#Clothing\" onclick=\'changeClothingCat(\"Top\")\'> Top </a></li><li><a href=\"#Clothing\" onclick=\'changeClothingCat(\"Jeans\")'> Jeans </a></li><li><a href=\"#Clothing\" onclick=\'changeClothingCat(\"Tracksuit\")\'> Tracksuit </a></li></ul></span><div class=\"row\" id=\"clothingContainer\"></div></div></section>";
	var rawhtml = `<section id="Clothing" class="projects-section bg-light" style="height: 100vh; overflow: auto;">	<div class="container">		<h1> Clothing </h1>			<div id="optionscontainer"></div>			<div class="row" id="clothingContainer"></div>	</div></section>`;
	addElement("sections-container", "section", "Clothing", rawhtml);
	populateClothingDropdown();
}

function loadGallerySection() {
	//loads the gallery section
	emptySectionContainer();
	var rawhtml = "<section id=\"Gallery\" class=\"projects-section bg-dark\"	style=\"height: calc(100vh - 60px);padding-left: 20%; padding-right: 20%; padding-top: 5%;\">	<div class=\"container\">		<h1 style=\"color:#f8f9fa;\" > Gallery </h1>		<div id=\"gallery-carousel\" class=\"carousel slide\" data-ride=\"carousel\">			<ol class=\"carousel-indicators\" id=\"pos-indicators\"></ol>			<div class=\"carousel-inner\" id=\"carousel-inner\"></div>			<a class=\"carousel-control-prev\" href=\"#gallery-carousel\" role=\"button\" data-slide=\"prev\">				<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>				<span class=\"sr-only\">Previous</span>			</a>			<a class=\"carousel-control-next\" href=\"#gallery-carousel\" role=\"button\" data-slide=\"next\">				<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>				<span class=\"sr-only\">Next</span>			</a>		</div>	</div>	</section>";

	addElement("sections-container", "section", "Gallery", rawhtml);

	getGalleryList().then(response => populateCarousel(response));
	if (profile != null) {
		var buttonHtml = `<button type="button" class="btn btn-primary" onclick="addGalleryImg;">Add Your Image!</button>`;
		var inputHtml =
			`<div class="input-group mb-3">
		<div class="container"><h3>${profile.getGivenName()}, Upload your images.</h3></div>
		<br/>
		<div class="input-group-prepend">
			<button class="btn-secondary" onclick="addGalleryImg()">Upload</button>
		</div>
		<div class="custom-file">
			<input type="file" class="custom-file-input" id="photoupload">
			<label class="custom-file-label" for="photoupload">Best dimensions are 800px by 400px</label>
		</div>
	</div>`;

		addElement("Gallery", "div", "uploadgroup", inputHtml);

	}
}

function loadContactSection() {
}

function loadCalendarSection() {
	//loads the calendar section
	emptySectionContainer();
}


function emptySectionContainer() {
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
	newElement.setAttribute('id', "temp-" + elementId);
	container.appendChild(newElement);
	var createdElement = document.getElementById("temp-" + elementId);
	createdElement.outerHTML = html;
	// container.appendChild(newElement);
}


function onSignIn(googleUser) {
	// Useful data for your client-side scripts:
	profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log('Full Name: ' + profile.getName());
	console.log('Given Name: ' + profile.getGivenName());
	console.log('Family Name: ' + profile.getFamilyName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	profile_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + profile_token);
	signInSuccess(profile);

}

function signInSuccess(givenProfile) {
	var elem = document.getElementById("members_area_btn");
	elem.setAttribute("data-toggle", "tooltip");
	elem.setAttribute("data-placement", "bottom");
	elem.setAttribute("title", "Sign Out");
	elem.setAttribute("onclick", "signOut();");
	elem.removeAttribute("data-target");
	elem.innerHTML = ` Hi, ${givenProfile.getGivenName()}`;
	loadGallerySection();


}
function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
		signOutSuccess();
	});

}

function signOutSuccess() {
	var elem = document.getElementById("members_area_btn");
	elem.setAttribute("data-toggle", "modal");
	elem.removeAttribute("data-placement");
	elem.removeAttribute("title");
	elem.removeAttribute("onclick");
	elem.setAttribute("data-target", "#membersAreaModal");
	elem.innerHTML = "Member Area";
	window.confirm("You've been signed out.");
	profile = null;
}

function addGalleryImg() {
	var albumName = "resources";
	var files = document.getElementById('photoupload').files;
	if (!files.length) {
		return alert('Please choose a file to upload first.');
	}
	var file = files[0];
	var fileName = file.name;
	var albumPhotosKey = encodeURIComponent(albumName) + '/';

	var photoKey = albumPhotosKey + fileName;
	createdurl = `https://s3.eu-west-2.amazonaws.com/peter.student.general/${photoKey}`;
	s3.upload({
		Key: photoKey,
		Body: file,
		ACL: 'public-read'
	}, function (err, data) {
		if (err) {
			return alert('There was an error uploading your photo: ', err.message);
		}
		alert('Successfully uploaded photo.');
		postGalleryItem();
		
		// viewAlbum(albumName);
	});
}

function postGalleryItem() {
	try {

		fetch(`${fetchUrl}/addgalleryitem`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": profile_token
				},
				body: `item=${JSON.stringify(createGalleryitm())}`
			})
			.then(function (response) {
				if (!response.ok) {
					throw new Error("problem adding image:" + response.code);
				}
				loadGallerySection();
			});
	} catch (error) {
		alert("problem: " + error);
	}


}

function createGalleryitm() {

	let item = {
		"id": 0,
		"items_worn": [],
		"url": createdurl,
		"description": `${profile.getName()} strutting their stuff in a chic design we intend to create.`
	};
	return item;

}