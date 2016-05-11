// scratchSerialRobot.js

// inspired by / based on picoExtension.js by Shane M. Clements


(function(ext) {
    var device = null;
    var rawData = null;

    ext.resetAll = function(){};
    ext._deviceConnected = function(){};

    function sendCmd(cmd){
        ws = new WebSocket("ws://archie3.local:5996");

        ws.onopen = function()
       {
          // Web Socket is connected, send data using send()
          ws.send("Scratch startup");
          console.log("ws open.");
          ws.send(cmd);
       };

       ws.onmessage = function (evt) 
       { 
          var received_msg = evt.data;
          console.log("received: " + evt.data);
       };

       while (!ws.readyState){console.log(ws.readyState)}

    }
/*
    var ws = new WebSocket("ws://archie3.local:5996");


*/
    ext._shutdown = function() {
        if(device) device.close();
        if(poller) poller = clearInterval(poller);
        device = null;
    };

    ext._getStatus = function() {
        if (!ws.readyState){return {status: 1, msg: 'Websocket connecting'}};
        return {status: 2, msg: 'websocket connected'};
    }

    ext.send_message = function(){
        sendCmd("test cmd");
    }


    var descriptor = {
        blocks: [
            [' ', 'send message', 'send_message'],
        ],
        menus: {
        },

    };

    ScratchExtensions.register('SerialRobot', descriptor, ext, {type: 'serial'});
})({});