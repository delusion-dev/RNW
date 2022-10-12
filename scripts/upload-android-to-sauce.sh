#!/bin/bash

curl \
  -F "payload=@./android/app/release/app-release.apk" \
  -F "name=app-release-$APP_VERSION.apk" \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'