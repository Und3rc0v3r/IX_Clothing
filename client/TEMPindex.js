/* eslint-disable quotes */
let dropdown = document.getElementById("iType-dropdown");

const url = "http://localhost:8090/itemtypes";
var ddContent = "hg";




window.addEventListener('click', function (event) {
	fetch('http://localhost:8090/itemtypes')
		.then(response => response.text())
		.then(body =>
			document.getElementById('content').innerHTML = body);
});

function populateDropdown() {
	//var respLo;
	fetch("http://localhost:8090/itemtypes")
		.then(response => response.json())
		.then(function(data) {
			var menuHtml = "<span class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle btn btn-default\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Clothing Type <span class=\"caret\"></span></a><ul class=\"dropdown-menu\">";
			for (var i = 0; i < data.length; i++) {
				menuHtml += '<li><a onclick="call(' + i + ')" href="#">' + data[i].type + '</a></li>';
			}
			menuHtml +=  '</ul></span>';
			document.getElementById("optionscontainer").innerHTML = menuHtml;

		});
		

	// var menuHtml = "<span class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle btn btn-default\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Clothing Type <span class=\"caret\"></span></a><ul class=\"dropdown-menu\">";
	// for (var i = 0; i < respLo.length; i++) {
	// 	menuHtml += '<li><a onclick="call(' + i + ')" href="#">' + respLo[i].type + '</a></li>';
	// }
	// menuHtml += '</ul></span>';
	// document.getElementById("optionscontainer").innerHTML = menuHtml;


}

document.addEventListener("DOMContentLoaded", function () {
	populateDropdown();
});




// fetch(url)
// 	.then(
// 		function (response) {
// 			if (response.status !== 200) {
// 				console.warn("Looks like there was a problem. Status Code: " +
// 					response.status);
// 				return;
// 			}

// 			// Examine the text in the response  
// 			response.json().then(function (data) {
// 				var option;

// 				for (var i = 0; i < data.length; i++) {
// 					option = document.createElement('option');
// 					option.text = data[i].name;
// 					option.value = data[i].abbreviation;
// 					dropdown.add(option);
// 				}
// 			});
// 		}
// 	)
// 	.catch(function (err) {
// 		console.error("Fetch Error -", err);
// 	});

