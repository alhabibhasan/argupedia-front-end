/**
 * 
 * @param {string} key The key to use to store the data
 * @param {string} value The object to store
 **/
const cacheValue = (key, value) => {
    if (!key || !key.length || !value) return

    let cacheObj = {
        data: value
    }

    let b64Obj = btoa(JSON.stringify(cacheObj))
    let b64key = btoa(key)
    sessionStorage.setItem(b64key, b64Obj)
}

/**
 * 
 * @param {string} key The key to use to store the data
 * @param {string} value The object to store
 **/
const getCacheValue = (key) => {
    if (!key || !key.length) return
    let b64key = btoa(key)
    let response = sessionStorage.getItem(b64key)
    if (!Boolean(response)) {
        return false
    }

    let decodeObj = atob(response)
    let jsObj = JSON.parse(decodeObj)
    return jsObj.data
}

export {
    cacheValue,
    getCacheValue
}