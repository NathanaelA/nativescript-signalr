var observable = require("data/observable");
var frame = require('ui/frame');

var signlr = require('nativescript-signalr');


var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
		this.socket = null;
	}
    HelloWorldModel.prototype.tapAction = function () {
		var self = this;
		if (this.socket && this.socket.isOpen()) {
			this.set("message", "Sending Hi...");
			this.socket.send('{"H":"chathub","M":"Send","A":["Android","Hi"],"I": "0"}');
			return;
		}
		
        this.set("message", "Connecting...");

		var serverText = frame.topmost().currentPage.getViewById('server').text;		

		signlr.createSignalRConnection("http", serverText, '[{"name":"chathub"}]', function(err, mySocket) {
			mySocket.addEventListener('open', function (evt) {
				console.log("We are Open!");
			});
			mySocket.addEventListener('message', function (evt) {
				console.log("Message contains", evt.type);
				if (Object.prototype.toString.call(evt.data) === "[object ArrayBuffer]") {
					console.log("We got binary message");
				} else {
					console.log("We got a message: ", evt.data);
					self.set("message", evt.data);
				}
			});
          

			mySocket.addEventListener('close', function (evt) {
				console.log("The Socket was Closed:", evt.code, evt.reason);
			});
			mySocket.addEventListener('error', function (evt) {
				console.log("The socket had an error", evt.error);
			});
			self.socket = mySocket;
		}).then(function() {
            console.log("Connected");
        }).catch(function(err) {
            console.log("error", err);
        });
    };
    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();
