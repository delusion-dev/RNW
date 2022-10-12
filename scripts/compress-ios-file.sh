#!/bin/bash

#!/bin/bash
cd ios
mkdir Payload
cd Payload
cp -r ../RNW.app .
cd ..
zip --symlinks -qr "Payload.ipa" Payload