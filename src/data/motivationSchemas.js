import firebase from './auth/fire'
import { getCacheValue, cacheValue } from '../util/cache'

const getDefaultCriticalQuestions = () => {
    return [
        'What intervening propositions in the sequence linking the actions are actually given?',
        'What other steps are required to fill in the sequence of actions to make sense?',
        'Are there consequences of the opposite value that ought to be taken into account?',
        'Is the argument really good/bad?',
        'Even if the argument is generally accepted as being true, are there good reasons for doubting its veracity?',
        'Even if the argument is generally accepted, how ethical and moral is it?',
    ]
}

const getSchemes = () => {
    let cachedResults = getCacheValue('motivationSchemes')
    if (cachedResults) return Promise.resolve(cachedResults)
    const database = firebase.database()
    return database.ref('/').once('value')
    .then(snapshot => {
        let values = snapshot.val()
        let formattedValues = []
        for (let field in values.schemes) {
            let record = {
                    label: values.schemes[field].label,
                    criticalQuestions:  values.schemes[field].criticalQuestions,
                    fields: values.schemes[field].schemeFields,
            }
            formattedValues.push(record)
        }
        cacheValue('motivationSchemes', formattedValues)
        return formattedValues
    })
    .catch((err) => {
       console.error(err)
    })
}

const getScheme = (schemeName) => {
    if (!Boolean(schemeName)) return Promise.reject('Need to supply a scheme name')
    return getSchemes()
    .then(schemes => {
        let schemeWithName = schemes.filter(scheme => scheme.label === schemeName)[0]
        return schemeWithName.fields
    })
}

export { 
    getSchemes,
    getScheme,
    getDefaultCriticalQuestions,
}