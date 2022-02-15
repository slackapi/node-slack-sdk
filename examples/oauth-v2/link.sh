#!/bin/bash

current_dir=`dirname $0`
cd ${current_dir}
npm unlink @slack/oauth \
  && npm i \
  && cd ../../packages/oauth \
  && npm link \
  && cd - \
  && npm i \
  && npm link @slack/oauth

