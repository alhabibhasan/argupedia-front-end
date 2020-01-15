const userLoggedInAndEmailVerified = (user) => {
    return user && user.emailVerified
}

export {
    userLoggedInAndEmailVerified
}