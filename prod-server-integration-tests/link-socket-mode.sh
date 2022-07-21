#!/bin/bash

current_dir=`dirname $0`
cd ${current_dir}
rm -rf package-lock.json node_modules/
npm unlink @slack/socket-mode \
  && npm i \
  && cd ../packages/socket-mode \
  && npm link \
  && cd - \
  && cd ../packages/socket-mode \
  && npm link \
  && cd - \
  && npm i \
  && npm link @slack/socket-mode