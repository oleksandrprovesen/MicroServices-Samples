"use strict";

const express = require('express')
const http = require("http");
const app = express()
const WebSocketServer = require('ws').Server;
const WebSocket = require("ws");


app.get('/', function (req, res) {
  res.send('connecthing.io node microservice!')
})

/*
The following code creates a websocket endpoint in your microservice. To open
a websocket from a custom widget your websocket URL would look like:
ws://[my-domain].connecthing.io/microservices/[microservice name]

Here is sample code you can paste into a custom Widget Template

    <script>

        function createWebSocket( path ){
            var target = null;
            console.dir(window.location.protocol);
            if (window.location.protocol == 'http:') {
                target = 'ws://' + window.location.host + path;
            } else {
                target = 'wss://' + window.location.host + path;
            }
            
            var ws = null;
            if ('WebSocket' in window) {
                ws = new WebSocket(target);
            } else if ('MozWebSocket' in window) {
                ws = new MozWebSocket(target);
            } else {
                console.warn('WebSocket is not supported by this browser.');
            }
            return ws;
        }
    
        //CHANGE THE NAME OF THE MICROSERVICE HERE
        var ws = createWebSocket("/microservices/test-1150802776948"); 
    
        ws.onerror = function(e){
      		console.error("Error", e);
      	};

      	ws.onclose = function(e){
	        console.log("Close", e);
    	};
    
        ws.onmessage = function(e){
            console.dir(e);
        }

    </script>
*/


var server = http.createServer(app);
var wss = new WebSocketServer({ server: server });
wss.on('connection', function connection(ws) {
    
    console.log("Websocket opened: " + ws.upgradeReq.url);
    var timer = setInterval(function(){
        try{
            if(ws.readyState == WebSocket.OPEN){
                var msg = new Date().valueOf() + "....";
                console.log("Sending: " + msg);
                ws.send(msg);
            }
        }
        catch(err){
            console.error(err.stack);
        }
    }, 1000);
        
    ws.on("close", function(code, message){
        console.log("Close");
        clearInterval(timer);
    });

    ws.on('message', function(data, flags) {
        console.log("Received " + data + " from clent");
    });

    ws.on("ping", function(data, flags){
        console.log("ping");
    });

    ws.on("pong", function(data, flags){
        console.log("pong");
    });

    ws.on("open", function(){            
        console.log("open");
    });
});
                        
const SERVER_PORT = 8080;
server.listen(SERVER_PORT, function () {
  console.log('connecthing.io node microservice listening on port ' + SERVER_PORT + '!');
})