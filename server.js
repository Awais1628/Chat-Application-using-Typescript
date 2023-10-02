
    var express = require("express");
    var app = express();
    var server = require("http").createServer(app);
    var io = require("socket.io")(server);
    users = [];
    connections = [];
    server.listen(3000);

    app.get("/", function(req, resp) {
        // route for localhost:3000/
        resp.sendFile(__dirname + "/index.html");
    });

    io.sockets.on("connection", function(socket) {
        // when a client connects to the server
        connections.push(socket); // add socket details to the custom array
        console.log("Connected: %s socket(s) connected", connections.length); // current connections
        socket.on("disconnect", function(data) {
            // client disconnects from the server
            connections.splice(connections.indexOf(socket), 1); // delete socket details
            console.log("Disconnected: %s socket(s) connected", connections.length); // current connections
        });

        socket.on("send message", function(data) {
            console.log(data);
            io.sockets.emit("new message", { msg: data });
        });
    });

