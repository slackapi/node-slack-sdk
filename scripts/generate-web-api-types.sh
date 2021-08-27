#!/bin/bash

script_dir=`dirname $0`
tmp_dir=${script_dir}/../tmp

rm -rf ${tmp_dir}
mkdir ${tmp_dir}
cd ${tmp_dir}

# Use the latest revision of the java-slack-sdk git repo
git clone https://github.com/slackapi/java-slack-sdk.git

cd -
cd ${script_dir}

# Download quicktype for generating code
npm i

# This Ruby script runs quicktype internally and do some additional modification to the generated files
ruby ./code_generator.rb
