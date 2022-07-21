#!/bin/bash

current_dir=`dirname $0`
cd ${current_dir}
rm -rf package-lock.json node_modules/
npm unlink @slack/web-api \
  && npm i \
  && cd ../packages/web-api \
  && npm link \
  && cd - \
  && cd ../packages/socket-mode \
  && npm link \
  && cd - \
  && npm i \
  && npm link @slack/web-api