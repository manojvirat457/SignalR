var express = require('express');
var SignalRJS = require('signalrjs');
 
//Init SignalRJs
var signalR = SignalRJS();
 
//Create the hub connection
//NOTE: Server methods are defined as an object on the second argument
signalR.hub('chatHub',{
    send : function(message){
        this.clients.all.invoke('send').withArgs([message])
        console.log('send:'+message);
    },
    setTopic: function(message){
        this.clients.all.invoke('setTopic').withArgs([message])
        console.log('setTopic:'+message);
    }
});
 
var server = express();
server.use(express.static(__dirname));
server.use(signalR.createListener())
server.listen(3000);