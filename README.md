# Raspberry Pi Radio GUI

A simple `semantic-ui-react` and `create-react-app` with an express http server to connect to a Raspberry Pi's `mplayer`

## Prerequisites
Before installing and starting on your own system, you need to add some environment variables so the app knows how to communicate to your Raspberry Pi:
- ensure that your Raspberry Pi has `mplayer` installed (on the Raspberry Pi, that is: `sudo apt-get install mplayer`) and you have downloaded some playlist (`.pls`) files (see the exact commands in `sshConnection.js`)
- create two export variables in your bash profile for the raspberry system: 1. `export RASPBERRY_PI_SSH_PASSWORD=thisismypassword` (no, that's not the actual password to mine ;) )
and 2. The username and local address of your Raspberry Pi on your network. (Ex.: The local address of my Raspberry Pi is `198.168.0.16`, and the user is simply `pi`, so I would provide the following: `export RASPBERRY_PI_USER_AND_HOST=pi@192.168.0.16`)

## To start using the app or developing:
- install node modules via npm: `npm install`

- start up the app server for development: `npm run start` (this app is a create-react-app) this should open in localhost:3000 as default

- start up the express HTTP server that connections to the Raspberry Pi: `node sshConnection.js` (runs currently on localhost:9999, see `App.js` to change the front end and `sshConnection.js` to change it)
