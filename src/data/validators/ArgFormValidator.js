import { camelCaseToSentenceCase } from "../../util/formatting"

const validateArgFormNotEmpty = (form, optionalFields) => {
    let validationResults = {
        isValid: true,
        msg: 'Form is valid'
    }
    for (let objectProperty in form) {
        if (!form[objectProperty] || !form[objectProperty].length && !optionalFields.includes(objectProperty)) {
            validationResults.isValid = false
            validationResults.msg = 'You are missing the ' + camelCaseToSentenceCase(objectProperty) + ' field.'
            return validationResults
        }
    }
    return validationResults
}

export {
    validateArgFormNotEmpty
}