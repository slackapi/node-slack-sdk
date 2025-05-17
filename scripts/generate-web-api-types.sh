#!/bin/bash

script_dir=`dirname $0`
tmp_dir=${script_dir}/../tmp

mkdir -p ${tmp_dir}
pushd ${tmp_dir}

# Use the latest revision of the java-slack-sdk git repo
test -d java-slack-sdk || git clone https://github.com/slackapi/java-slack-sdk.git
pushd java-slack-sdk
git pull origin main
popd
popd
pushd ${script_dir}

# Download quicktype for generating code
npm i

# This Ruby script runs quicktype internally and do some additional modification to the generated files
ruby ./code_generator.rb
popd
# run lint fixing after type generation
pushd packages/web-api
npm i
npm run lint:fix
