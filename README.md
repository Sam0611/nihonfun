# nihonfun
online japanese quiz using node.js and websockets

Open your shell in server directory and run :
node index.js
It will start a server for websockets listening to port 5500 (you can change port number in server_conf.js).

Then, you will need a live server to run the website since it's a single page application (using fetch).
To do so, you can install the "Live Server" extension on Visual Studio Code and then click on "Go Live" at the bottom right to start the server.
It will listen to port 5501, so you can access the website on http://127.0.0.1:5501/

You can create quiz and invite your friends by sending them the unique game ID that will be generated.
