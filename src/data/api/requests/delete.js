import axios from 'axios'
import getAuthToken from '../util'

const deleteArgument = (argId) => {
    return getAuthToken()
    .then(config => {
        return axios.delete(process.env.REACT_APP_API_BASE_URL+ '/arg/delete/' + argId, config)
            .then(res => res.data)
            .catch(err => {
                throw new Error(err)
            })
    })
}


export {
    deleteArgument,
}