const request = require("supertest");
const app = require("./app");

// mock the login so that it always says we are logged in
jest.mock("./login", () => {
	var responseObj = { "status": "", "error": "", "ok": true };
	return jest.fn(() => responseObj);
});

function serialise(obj) {
	return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

describe("Testing the clothing RESTful API", () => {
	test("GET /itemtypes succeeds", () => {
		return request(app)
			.get("/itemtypes")
			.expect(200);
	});

	test("GET /itemtypes returns JSON", () => {
		return request(app)
			.get("/itemtypes")
			.expect("Content-type", /json/);
	});


	test("GET /allclothing succeeds", () => {
		return request(app)
			.get("/allclothing")
			.expect(200);
	});

	test("GET /allclothing returns JSON", () => {
		return request(app)
			.get("/allclothing")
			.expect("Content-type", /json/);
	});


	test("GET /clothing succeeds", () => {
		return request(app)
			.get("/allclothing")
			.expect(200);
	});

	test("GET /clothing returns JSON", () => {
		return request(app)
			.get("/allclothing")
			.expect("Content-type", /json/);
	});

	test("GET /gallery succeeds", () => {
		return request(app)
			.get("/allclothing")
			.expect(200);
	});

	test("GET /gallery returns JSON", () => {
		return request(app)
			.get("/allclothing")
			.expect("Content-type", /json/);
	});

	test("POST /addgalleryitem works", () => {

		let galleryItem = {
			"id": 10,
			"items_worn": [],
			"url": "TestImage.jpeg",
			"description": "User strutting their stuff in a chic design we intend to create."
		};

		
		return request(app)
			.post("/addgalleryitem", {
				headers: {
					"Authorization": "fakeToken",
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
			.send(`item=${JSON.stringify(galleryItem)}`)
			.expect(200);
	});

	test("POST /addgalleryitem returns json", () => {

		let galleryItem = {
			"id": 10,
			"items_worn": [],
			"url": "TestImage.jpeg",
			"description": "User strutting their stuff in a chic design we intend to create."
		};

		
		return request(app)
			.post("/addgalleryitem", {
				headers: {
					"Authorization": "fakeToken",
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
			.send(`item=${JSON.stringify(galleryItem)}`)
			.expect("Content-type", /json/);
	});

	test("POST /addgalleryitem checks for a gallery item", () => {
		
		
		return request(app)
			.post("/addgalleryitem", {
				headers: {
					"Authorization": "fakeToken",
					"Content-Type": "application/x-www-form-urlencoded"
				}
			})
			.send("Not correck item")
			.expect(400);
	});
});