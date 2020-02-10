import firebase from '../../data/auth/fire'

const getAuthToken = () => {
    let currentUser = firebase.auth().currentUser
    if (currentUser) {
        return currentUser.getIdToken().then(token => {
            return {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        })
        .catch(err => console.error(`Failed to generate user token ${err}`))
    }
    return Promise.resolve('User is not logged in.')
}

export default getAuthToken