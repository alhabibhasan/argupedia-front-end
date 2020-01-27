const userLoggedInAndEmailVerified = (user) => {
    return Boolean(user && user.emailVerified)
}

export {
    userLoggedInAndEmailVerified
}