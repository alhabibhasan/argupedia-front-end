const redirectTo = (history, to) => {
    history.push(to);
}

const waitThenRedirectTo = (history, to, wait) => {
    setTimeout(() => {
        redirectTo(history, to)
    }, wait)
}

export {
    redirectTo,
    waitThenRedirectTo,
};