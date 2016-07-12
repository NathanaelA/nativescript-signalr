You need to run a signalr sample chathub server app; and then you can use this sample app to connect to the server.  If you choose to use a different signalr demo; you can set the demo app to use that channel by changing the data: '[{"name":"chathub"}]' in the main-view-model to whatever name the main signalr server channel is called.

The sample app is rather simple; it basically connects on the first tap of the button.  The status line in the app will show the last message received and the console will output each message.   If you also connect via a web browser to the server you can see the message the app sent and the app will see any messages that the browser sent showing you that it is fully connected as a signalr client.    In addition if you click the "Tap" button while connected it will send a simple "Hi" message to the server.

All the sample code is in the main-view-model.js 
