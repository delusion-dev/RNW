#!/bin/bash

# upload zip 
# curl \
#   -F "payload=@../apps/RNW.zip" \
#   -F name=$RNW.zip \
#   -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
#   'https://api.eu-central-1.saucelabs.com/v1/storage/upload'

# upload ipa
curl \
  -F "payload=@./ios/Payload.ipa" \
  -F name=Payload.ipa \
  -u "$SAUCE_USERNAME:$SAUCE_ACCESS_KEY" \
  'https://api.eu-central-1.saucelabs.com/v1/storage/upload'