// this is a custom server to serve the static site (built by create-react-app), but there is one POST to send commands to the pi through ssh, like the email list and sending messages, need to be handled
'use strict';
var http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
var cors = require('cors');
const app = express();
var fs = require('fs');
var exec = require('exec');
var bodyParser = require('body-parser');
var shell = require('shelljs');

// cors
app.use(cors());

// bodyParser to get posts from axios POST on the frontend
app.use(bodyParser.json());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// command endpoint
app.post('/command', function (req, res) {
  let oResponse, oSubProcess, sCommand, sFullCommand;
  if (["fm4", "oe1", "house", "robo", "volu", "vold", "killmplayer"].indexOf(req.body.sCommand) === -1) {
    oResponse = {
      sResponse: "Invalid command!"
    };
    res.send(JSON.stringify(oResponse));
  } else {
    switch (req.body.sCommand) {
      case "fm4":
      sFullCommand = 'mplayer -noconsolecontrols -playlist /home/pi/radio/fm4.pls &>/dev/null &disown;'
      break;
      case "oe1":
      sFullCommand = 'mplayer -noconsolecontrols -playlist /home/pi/radio/oe1.pls &>/dev/null &disown;'
      break;
      case "house":
      sFullCommand = 'mplayer -noconsolecontrols -playlist /home/pi/radio/house.pls &>/dev/null &disown;'
      break;
      case "robo":
      sFullCommand = 'mplayer -noconsolecontrols -playlist /home/pi/radio/roboton.hi.m3u &>/dev/null &disown;'
      break;
      case "volu":
      sFullCommand = 'amixer cset numid=3 1 &>/dev/null &disown;'
      break;
      case "vold":
      sFullCommand = 'amixer cset numid=3 2 &>/dev/null &disown;'
      break;
      case "killmplayer":
      sFullCommand = 'killall mplayer &>/dev/null &disown;'
      break;
    }
    sCommand = "sshpass -p " + process.env.RASPBERRY_PI_SSH_PASSWORD + " ssh " + process.env.RASPBERRY_PI_USER_AND_HOST + " " + sFullCommand;
    console.log(sCommand);
    const oSubProcess = shell.exec(sCommand, function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
      oResponse = {
        sResponse: code + stdout + stderr
      };
      res.send(JSON.stringify(oResponse));
    });
  }
});

http.createServer(app).listen(9999);
