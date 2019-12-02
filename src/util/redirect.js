const redirectTo = (history, to) => {
    history.push(to);
}

const waitThenRedirectTo = (history, to, wait) => {
    setTimeout(() => {
        redirectTo(history, to)
    }, wait)
}

const confirmLeave = (history) => {
    if (window.confirm('If you leave, you will loose any content you have added below. Are you sure you want to leave?')) {
        history.goBack()
    }
  }

export {
    redirectTo,
    waitThenRedirectTo,
    confirmLeave
};