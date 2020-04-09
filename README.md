# Argupedia front end

## Set up, install and run

`git clone https://github.com/alhabibhasan/argupedia-front-end.git`

`cd argupedia-front-end; npm install; npm start`

## Firebase set up

You will need to set up and connect to your own instance of firebase. Steps to do this can be found here: https://firebase.google.com/

You will need to add the credentials into the ```admin/firebase/auth/firebase.js``` file.

Your firebase instance will need to have auth and realtime DB enabled.

### Auth

We require at least email and password and Google authentication to be enabled via the Firebase Auth panel.

Please ensure this has been setup. You can find steps here: https://firebase.google.com/docs/auth/web/password-auth. This link will show you how to enable email and password auth, it will contain links to enabling Google authentication as well.

### Realtime DB

You must also set up a realtime Database instance. Steps to create your own firebase realtime database instance can be found here: https://firebase.google.com/docs/database/web/start

Only add data to the realtime DB via the Admin panel accessed via the back end app. This will mean that the react app will be able to read the data in the correct way.



