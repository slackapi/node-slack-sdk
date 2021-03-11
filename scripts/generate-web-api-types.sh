#!/bin/bash

script_dir=`dirname $0`
tmp_dir=${script_dir}/../tmp

rm -rf ${tmp_dir}
mkdir ${tmp_dir}
cd ${tmp_dir}
git clone https://github.com/slackapi/java-slack-sdk.git

cd -
cd ${script_dir}

npm i
ruby ./code_generator.rb
