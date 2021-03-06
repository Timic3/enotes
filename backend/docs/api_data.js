define({ "api": [
  {
    "type": "POST",
    "url": "/authentication/login",
    "title": "Login",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Login",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User information</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": "<p>User ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.token",
            "description": "<p>JWT Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "POST",
    "url": "/authentication/register",
    "title": "Register",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Register",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "mobile",
            "description": "<p>Is mobile version?</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "captcha",
            "description": "<p>ReCAPTCHA token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message of request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "POST",
    "url": "/drawings/create",
    "title": "Create drawings",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Create_drawings",
    "group": "Drawings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "clientX",
            "description": "<p>Position X</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "clientY",
            "description": "<p>Position Y</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "imageURL",
            "description": "<p>Image URL</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/drawing.js",
    "groupTitle": "Drawings"
  },
  {
    "type": "POST",
    "url": "/drawings/get",
    "title": "Get drawings",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Get_drawings",
    "group": "Drawings",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "array",
            "description": "<p>All drawings</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.clientX",
            "description": "<p>Position X</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.clientY",
            "description": "<p>Position Y</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.imageURL",
            "description": "<p>Image URL</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/drawing.js",
    "groupTitle": "Drawings"
  },
  {
    "type": "POST",
    "url": "/notes/create",
    "title": "Add note",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Add_note",
    "group": "Notes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Note type (Normal, Todo)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "Color",
            "description": "<p>Color (R, G, B, A)</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "clientX",
            "description": "<p>Position X</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "clientY",
            "description": "<p>Position Y</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "imageURL",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "reminderDate",
            "description": "<p>Reminder date</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/note.js",
    "groupTitle": "Notes"
  },
  {
    "type": "POST",
    "url": "/notes/get",
    "title": "Get notes",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Get_notes",
    "group": "Notes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "array",
            "description": "<p>All notes</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.text",
            "description": "<p>Text</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.type",
            "description": "<p>Type (Todo, Normal)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.color",
            "description": "<p>Color (R, G, B, A)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.clientX",
            "description": "<p>Position X</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.clientY",
            "description": "<p>Position Y</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.imageURL",
            "description": "<p>Image URL</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "array.reminderDate",
            "description": "<p>Reminder date</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/note.js",
    "groupTitle": "Notes"
  },
  {
    "type": "POST",
    "url": "/notes/gettodo",
    "title": "Get todos",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Get_todos",
    "group": "Notes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "noteid",
            "description": "<p>Note ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "array",
            "description": "<p>All todos</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "array.id",
            "description": "<p>ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.title",
            "description": "<p>Title</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "array.text",
            "description": "<p>Text</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "array.checked",
            "description": "<p>Is todo checked?</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/note.js",
    "groupTitle": "Notes"
  },
  {
    "type": "POST",
    "url": "/notes/removenote",
    "title": "Remove note",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Remove_note",
    "group": "Notes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "noteid",
            "description": "<p>Note ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/note.js",
    "groupTitle": "Notes"
  },
  {
    "type": "POST",
    "url": "/notes/updateNotePos",
    "title": "Update note position",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Update_note_position",
    "group": "Notes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "noteid",
            "description": "<p>Note ID</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "clientX",
            "description": "<p>Position X</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "clientY",
            "description": "<p>Position Y</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/note.js",
    "groupTitle": "Notes"
  },
  {
    "type": "POST",
    "url": "/notes/updatetodo",
    "title": "Update todo",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Update_todo",
    "group": "Notes",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>JWT token passed with 'Bearer'</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "todoid",
            "description": "<p>Todo ID</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "checked",
            "description": "<p>Is todo checked?</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>If invalid token was specified</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/note.js",
    "groupTitle": "Notes"
  },
  {
    "type": "GET",
    "url": "/health",
    "title": "Health",
    "sampleRequest": [
      {
        "url": "https://api-enotes.westeurope.cloudapp.azure.com/"
      }
    ],
    "name": "Health",
    "group": "Service",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Status of request</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/index.js",
    "groupTitle": "Service"
  }
] });
