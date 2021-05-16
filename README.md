# LINE Chatbot connect google sheet #

## Prerequire ##
- LineBot Channel
- LineBot Provider
- Firebase account with Blaze plan
    - enable Cloud Firestore

# Installation #

## install firebase cli ##

*npm install -g firebase-tools*

## check firebase cli version ##

*firebase --version*

## initialize project ##

*firebase login*

*cd <project_directory>*

*firebase init functions*

## install dependency ##

*npm install*

## test firebase function locally ##

### initial emulators ###

*firebase init emulators*

### build project ###

*npm run build*

### install google api to retrieve data from google sheet ###
*npm install --save googleapis*


### start emulators ###

*firebase emulators:start*

## firebase deployment ##

*firebase deploy --only functions*

## generate private key in firebase console ##
*1. go to project setting*

*2. go to service accounts*

*3. Generate new private key*

*4. Download json file and move into functions directory in the project*

## share google sheet to firebase client email ##

*1. check client email in credential.json from Service account generated*

*2. share google sheet to firebase client email*

## Enable google sheet api ##

*https://console.developers.google.com/apis/library/sheets.googleapis.com*


