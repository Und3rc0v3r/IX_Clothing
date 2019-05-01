/* eslint-disable quotes */


function getClothing(type) {
	fetch('http://localhost:8090/clothing',
		{
			method: "GET",
			headers: { "Content-Type": "application/json", }
		})
		.then(response => response.text())
		.then(body =>
			document.getElementById('content').innerHTML = body);
}




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
		.then(function (data) {
			var menuHtml = "<span class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle btn btn-default\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"> Clothing Type <span class=\"caret\"></span></a><ul class=\"dropdown-menu\">";
			for (var i = 0; i < data.length; i++) {
				menuHtml += `<li><a onclick='changeClothingCat("${data[i].id}")' href='#Clothing'> ${data[i].display_name} </a></li>`;
			}
			menuHtml += '</ul></span>';
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




// This will upload the file after having read it
function upload() {
	var elem = document.getElementById("fileinput");
	var file = elem.files[0];
	console.log(file);
	fetch('http://localhost:8090/submit_img', { // Your POST endpoint
		method: 'POST',
		body: file // This is your file object
	})
		.then(function (response) {
			console.log(response);
			response.blob();
		}) // if the response is a JSON object		
		.then(
			success => console.log(success) // Handle the success response object
		).catch(
			error => console.log(error) // Handle the error response object
		);
}

// Event handler executed when a file is selected
// const onSelectFile = () => upload(input.files[0]);

// // Add a listener on your input
// // It will be triggered when a file will be selected
// input.addEventListener('change', onSelectFile, false);


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


function addPhoto() {
	var albumName = "resources";
	var files = document.getElementById('photoupload').files;
	if (!files.length) {
		return alert('Please choose a file to upload first.');
	}
	var file = files[0];
	var fileName = file.name;
	var albumPhotosKey = encodeURIComponent(albumName) + '/';

	var photoKey = albumPhotosKey + fileName;
	s3.upload({
		Key: photoKey,
		Body: file,
		ACL: 'public-read'
	}, function (err, data) {
		if (err) {
			return alert('There was an error uploading your photo: ', err.message);
		}
		alert('Successfully uploaded photo.');
		// viewAlbum(albumName);
	});
}

function deletePhoto(albumName, photoKey) {
	s3.deleteObject({ Key: photoKey }, function (err, data) {
		if (err) {
			return alert('There was an error deleting your photo: ', err.message);
		}
		alert('Successfully deleted photo.');
		viewAlbum(albumName);
	});
}

// function deleteAlbum(albumName) {
// 	var albumKey = encodeURIComponent(albumName) + '/';
// 	s3.listObjects({ Prefix: albumKey }, function (err, data) {
// 		if (err) {
// 			return alert('There was an error deleting your album: ', err.message);
// 		}
// 		var objects = data.Contents.map(function (object) {
// 			return { Key: object.Key };
// 		});
// 		s3.deleteObjects({
// 			Delete: { Objects: objects, Quiet: true }
// 		}, function (err, data) {
// 			if (err) {
// 				return alert('There was an error deleting your album: ', err.message);
// 			}
// 			alert('Successfully deleted album.');
// 			listAlbums();
// 		});
// 	});
// }
