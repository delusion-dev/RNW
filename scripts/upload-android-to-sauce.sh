#!/bin/bash
echo "Uploading Android app with the name: ${E2E_ANDROID_APP_NAME}.apk ..."
curl \
  -F "payload=@./android/app/release/app-release.apk" \
  -F "name=$E2E_ANDROID_APP_NAME.apk" \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'
# TODO Check success!