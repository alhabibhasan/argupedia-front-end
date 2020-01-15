import firebase from './fire'

const authListener = (setUser, setCheckingAuth) => {
     firebase.auth().onAuthStateChanged(userCred => {
        console.log('running auth listener');
        if (setCheckingAuth) setCheckingAuth(false);
        if (setUser) setUser(userCred);
    })
};

export default authListener;