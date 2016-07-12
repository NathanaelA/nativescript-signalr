var application = require("application");
application.mainModule = "main-page";
application.cssFile = "./app.css";
var le = require('nativescript-liveedit');
le.addRestartFile('signlr.js');
le.addRestartFile('websockets.js');
application.start();
 