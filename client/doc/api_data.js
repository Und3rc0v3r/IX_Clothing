define({ "api": [
  {
    "type": "get",
    "url": "/allclothing",
    "title": "Requests whole clothing list",
    "name": "AllClothing",
    "group": "Clothing",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "body",
            "description": "<p>This is an array of clothes</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body.item",
            "description": "<p>This is a clothing item, it would be returned as body[0]</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "body.item.id",
            "description": "<p>Item id for reference</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.name",
            "description": "<p>Displayname for the cloting item</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.type",
            "description": "<p>Server-side type designation (relates to itemtype)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.url",
            "description": "<p>Image url</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.description",
            "description": "<p>Description of clothing item</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.price",
            "description": "<p>The cost of the item</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/app.1.js",
    "groupTitle": "Clothing"
  },
  {
    "type": "get",
    "url": "/clothing?type=[type]",
    "title": "Requests specfic type of clothing",
    "name": "Clothing",
    "group": "Clothing",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "type",
            "description": "<p>id from itemType passed back</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "body",
            "description": "<p>This is an array of clothes</p>"
          },
          {
            "group": "Success 200",
            "type": "Objects",
            "optional": false,
            "field": "body.item",
            "description": "<p>ItemType object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "body.item.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.type",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.url",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.description",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.item.price",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Status 400 - Bad Request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>Status 500 - Internal Server Error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/app.1.js",
    "groupTitle": "Clothing"
  },
  {
    "type": "post",
    "url": "/addgalleryitem",
    "title": "Posts gallery item to the server",
    "name": "AddGalleryItem",
    "group": "Gallery",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "Bearer-[GoogleToken]",
            "description": "<p>this is the google id token passed back for verification</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "item",
            "description": "<p>This is the gallery item object</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "item.id",
            "description": "<ul> <li>The item Id</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "item.items_worn",
            "description": "<ul> <li>Array of Items worn in the pictures</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "item.items_worn.i",
            "description": "<ul> <li>Items worn object</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item.items_worn.i.url",
            "description": "<ul> <li>The url of the image</li> </ul>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "item.items_worn.i.description",
            "description": "<ul> <li>The item description</li> </ul>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>200 - 299 (success status)</p>"
          },
          {
            "group": "Success 200",
            "type": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>If any was thrown but still acceptable</p>"
          },
          {
            "group": "Success 200",
            "type": "Bool",
            "optional": false,
            "field": "ok",
            "description": "<p>true - post success</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>400s &amp; 500s (fail status)</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Error",
            "optional": false,
            "field": "error",
            "description": "<p>f any was thrown but still acceptable</p>"
          },
          {
            "group": "Error 4xx",
            "type": "Bool",
            "optional": false,
            "field": "ok",
            "description": "<p>false - post failure</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/app.1.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "get",
    "url": "/gallery",
    "title": "Requests gallery",
    "name": "Gallery",
    "group": "Gallery",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "body",
            "description": "<p>This is a list of gallery items</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body.i",
            "description": "<p>This is the gallery item object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "body.i.id",
            "description": "<ul> <li>The item Id</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "body.i.items_worn",
            "description": "<ul> <li>Array of Items worn in the pictures</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "body.i.items_worn.i",
            "description": "<ul> <li>Array of Items worn in the pictures</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.i.items_worn.i.url",
            "description": "<ul> <li>The url of the image</li> </ul>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.i.items_worn.i.description",
            "description": "<ul> <li>The item description</li> </ul>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Status 400 - Bad Request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/app.1.js",
    "groupTitle": "Gallery"
  },
  {
    "type": "get",
    "url": "/itemtypes",
    "title": "Requests item types (for dropdowns)",
    "name": "itemtypes",
    "group": "Types",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "body",
            "description": "<p>This is an array of itemTypes</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "body.itemType",
            "description": "<p>itemType object, it would be returned as body[0]</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.itemType.display_name",
            "description": "<p>The client-side display name of the item</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "body.itemType.id",
            "description": "<p>The server-side identifer for the item type in relation to clothes</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/app.1.js",
    "groupTitle": "Types"
  }
] });
