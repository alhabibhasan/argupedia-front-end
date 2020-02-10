import axios from 'axios'
import getAuthToken from '../util'


const updateArgument = (argId, arg) => {
    return getAuthToken()
    .then(config => {
        let updateEndpoint = process.env.REACT_APP_API_BASE_URL+ '/arg/update/'
        if (arg.parentId > 0) {
            updateEndpoint += 'response/'
        }
        return axios.patch(updateEndpoint + argId, arg, config)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    })
}

export {
    updateArgument,
}