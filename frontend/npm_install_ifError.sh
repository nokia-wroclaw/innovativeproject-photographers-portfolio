#!/bin/bash

sudo rm -r node_modules/
sudo rm package-lock.json
sudo npm install --unsafe-perm node-sass react-flip-move react-bootstrap
sudo npm install
sudo npm install -g node-gyp
sudo apt-get install g++ build-essential
