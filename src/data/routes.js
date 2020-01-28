const index = { defintion: '/', use: '/'}
const roots = { defintion: '/roots', use: '/roots'}
const createArgument = { defintion: '/argument/create', use: '/argument/create'}
const readArgument = { defintion: '/argument/:id', use: '/argument/'}
const auth = {
    login: {
        use: '/login'
    },
    logout: {
        use: '/logout'
    },
    register: {
        use: '/register'
    },
    passwordReset: {
        use: '/password-reset'
    },
    profile: {
        use: '/profile'
    }
}


export {
    index,
    roots,
    createArgument,
    readArgument,
    auth,
}