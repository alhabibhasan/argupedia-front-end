import axios from 'axios'

const deleteArgument = (argId) => {
    return axios.delete(process.env.REACT_APP_API_BASE_URL+ '/arg/delete/' + argId)
        .then(res => res.data)
        .catch(err => {
            throw new Error(err)
        })
}


export {
    deleteArgument,
}