// scratchSerialRobot.js

// inspired by / based on picoExtension.js by Shane M. Clements


(function(ext) {
    var device = null;
    var rawData = null;

    ext.resetAll = function(){};
    ext._deviceConnected = function(){};

    ws = new WebSocket("ws://archie2:5996");

    ws.onopen = function()
   {
      // Web Socket is connected, send data using send()
      //ws.send(cmd);
      console.log("ws open.");
      ws.send("scratch started");
      //console.log("sending cmd: " + cmd);
      //window.setTimeout(function(){callback()}, 1000);
   };

   ws.onmessage = function (evt) 
   { 
      var received_msg = evt.data;
      console.log("received: " + evt.data);
   };


    function sendCmd(cmd, callback){
        if (ws.readyState){
            ws.send(JSON.stringify(cmd));
        }
        callback();

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
        //if (!ws.readyState){return {status: 1, msg: 'Websocket connecting'}};
        return {status: 2, msg: 'websocket connected'};
    }

    ext.send_message = function(callback){
        console.log("send command function");
        //console.log("wsa size: "  + wsa.length);
        cmd = {"cmd": "celebrate", "id": 12};
        sendCmd(cmd,callback);
        //window.setTimeout(function(){callback()}, 1000);
        //callback();
    }

    ext.wiggle = function(callback){
      cmd = {"cmd": "celebrate", "id": 12};
      sendCmd(cmd,callback);
    }

    ext.walk_forward = function(numsteps, callback){
      cmd = {"cmd": "walk", "id": 6, "numsteps": numsteps, "steplength": 50, "turn": 0, "movetime": 16};
      sendCmd(cmd, callback);
    }

    ext.walk_backward = function(numsteps, callback){
      cmd = {"cmd": "walk", "id": 6, "numsteps": numsteps, "steplength": -50, "turn": 0, "movetime": 16};
      sendCmd(cmd, callback); 
    }

    ext.turn = function(direction, numsteps, callback){
      var turn = 40;
      if (direction == "right" ){
        turn = -40;
      }
      cmd = {"cmd": "walk", "id": 6, "numsteps": numsteps, "steplength": 0, "turn": turn, "movetime": 13};
      sendCmd(cmd, callback);
    }

    ext.hello = function(callback){
      cmd = {"cmd": "hello", "id": 0};
      sendCmd(cmd, callback);
    }

    ext.kick = function(leg, callback){
      cmd = {"cmd": "kick", "id": 8, "leg": leg};
      sendCmd(cmd, callback); 
    }

    ext.eyes = function(eyes, callback){
      cmd = {"cmd": "eyes", "id": 7, "eyes": eyes};
      sendCmd(cmd, callback);
    }


    var descriptor = {
        blocks: [
          ['w', 'Get Ready', 'hello'],
          ['w', 'Wiggle', 'wiggle'],
          ['w', 'Walk %n steps forward', 'walk_forward', 2],
          ['w', 'Walk %n steps backward', 'walk_backward', 2],
          ['w', 'Turn %m.leg %n steps', 'turn', 'left', 2],
          ['w', 'Kick %m.leg leg', 'kick', 'left'],
          ['w', 'Eyes %m.eyes', 'eyes', 'normal'],
//          ['w', 'Demo', 'demo']
        ],
        menus: {
          leg: ['left', 'right'],
          eyes: ['normal', 'wide', 'angry'],
        },

    };

    ScratchExtensions.register('SerialRobot', descriptor, ext, {type: 'serial'});
})({});