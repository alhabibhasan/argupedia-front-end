import axios from 'axios'


const updateArgument = (argId, arg) => {
    let updateEndpoint = process.env.REACT_APP_API_BASE_URL+ '/arg/update/'
    if (arg.parentId > 0) {
        updateEndpoint += 'response/'
    }
    return axios.patch(updateEndpoint + argId, arg)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}

export {
    updateArgument,
}