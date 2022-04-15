#!/bin/bash

current_dir=`dirname $0`
cd ${current_dir}
npm unlink @slack/socket-mode \
  && npm i \
  && cd .. \
  && npm link \
  && cd - \
  && npm i \
  && npm link @slack/socket-mode

