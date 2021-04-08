#!/bin/bash

current_dir=`dirname $0`
cd ${current_dir}
npm unlink @slack/web-api \
  && npm unlink @slack/socket-mode \
  && npm i \
  && cd ../packages/web-api \
  && npm link \
  && cd - \
  && cd ../packages/socket-mode \
  && npm link \
  && cd - \
  && npm i \
  && npm link @slack/web-api \
  && npm link @slack/socket-mode
