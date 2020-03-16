# Arguepedia front end

## Set up and install

`git clone https://github.com/alhabibhasan/argupedia-front-end.git`

`cd argupedia-front-end; npm install; npm start`

## Firebase set up

You will need to set up and connect to your own instance of firebase.

You will need to add the credentials into the ```src/data/auth/fire.js``` file.

Your firebase instance will need to have auth and realtime DB enabled.

### Auth

We require at least email and password and Google authentication to be enabled via the Firebase Auth panel.

Please ensure this has been setup.

### Realtime DB

You must also set up a realtime Database instance.

Only add data to the realtime DB via the Admin panel accessed via the back end app. This will mean that the react app will be able to read the data in the correct way.



