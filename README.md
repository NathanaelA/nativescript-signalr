[![npm](https://img.shields.io/npm/v/nativescript-signalr.svg)](https://www.npmjs.com/package/nativescript-signalr)
[![npm](https://img.shields.io/npm/l/nativescript-signalr.svg)](https://www.npmjs.com/package/nativescript-signalr)
[![npm](https://img.shields.io/npm/dt/nativescript-signalr.svg?label=npm%20d%2fls)](https://www.npmjs.com/package/nativescript-signalr)

# nativescript-signalr
A NativeScript plugin to connect and talk to a C# signalr server

**WARNING:** The code is NOT "officially" on NPM yet, the code/plugin is available to Patreon supporters or purchasable via 
[http://nativescript.tools](http://nativescript.tools/all)

THIS is on NPM to be used as a Placeholder so that this plugin does have a home when(if?) it is ever released open source.

## License

The actual code is released under what I call the PATRON License, meaning you are free to include this in any type of program as long as you downloaded this when you were a current multi-month patron/sponsor, and got the file directly from the patreon post.  

Depending on the support of the plugin from Patron's -- it may be released under a proper open source license at a time of my choosing (typically after a couple months of exclusive access by sponsor's).  At that point the product will be re-released under the MIT license. 

In addition to the PATRON license, you can purchase this directly under a COMMERCIAL license from the [http://nativescript.tools](http://nativescript.tools/all) site.
 
I also do contract work; so if you have a module you want built for NativeScript (or any other software projects) feel free to contact me [nathan@master-technology.com](mailto://nathan@master-technology.com).

[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg?style=plastic)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=HN8DDMWVGBNQL&lc=US&item_name=Nathanael%20Anderson&item_number=nativescript%2dsignalr&no_note=1&no_shipping=1&currency_code=USD&bn=PP%2dDonationsBF%3ax%3aNonHosted)
[![Patreon](https://img.shields.io/badge/Pledge-Patreon-brightgreen.svg?style=plastic)](https://www.patreon.com/NathanaelA)
 

## Installation 

Download from the patreon link

tns plugin add nativescript-signalr-1.0.0.tgz


## Usage

To use the module you just `require()` it, and then tell it to connect to your server:

```js
var signalr = require( "nativescript-signalr" );

// Send Protocol (i.e. http or https), Server Name, signalr data, websocket setup function
signalr.createSignalRConnection("http", "127.0.0.1", '[{"name":"chathub"}]', 
      function(err, mySocket) {
			// This function allows you to attach any event listeners to the socket before it is opened that you might need.
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
		}).then(function(socket) {
            console.log("Connected to our socket");
			// Do something with the open socket if need be...
			socket.send({m:"We are here"});
        }).catch(function(err) {
            console.log("error", err);
        });

```


### Function
#### createSignalRConnection(protocol, url, data, setupWSHandlers)
##### protocol - http or https
##### url - the url of your site; i.e. signalr.mydomain.com
##### data - the data you need to send to the server (i.e. like channel)
##### setupWSHandlers - a callback function to allow you to setup any WebSocket handlers that you might need.
WebSocket Handlers, are "error", "close", "message" and "open"

The socket returned in the promise (and the setupWSHandlers) supports the standard web socket commands like:
* .close()
* .send()
* .readyState

Please see the nativescript-websockets documentation for any specifics.


### Demo information

You need to run a signalr sample chathub server app; and then you can use this sample app to connect to the server.  If you choose to use a different signalr demo; you can set the demo app to use that channel by changing the data: '[{"name":"chathub"}]' in the main-view-model to whatever name the main signalr server channel is called.

The sample app is rather simple; it basically connects on the first tap of the button.  The status line in the app will show the last message received and the console will output each message.   If you also connect via a web browser to the server you can see the message the app sent and the app will see any messages that the browser sent showing you that it is fully connected as a signalr client.    In addition if you click the "Tap" button while connected it will send a simple "Hi" message to the server.

All the sample code is in the main-view-model.js 

