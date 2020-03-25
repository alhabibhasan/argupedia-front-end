import { camelCaseToSentenceCase } from "../../util/formatting"

const DEFAULT_FIELD_REQUIRED_SIZE = 6

const argumentRules = {
    'statement': (statement, validationResults) => {
        if (statement.length < 6) {
            validationResults.isValid = false
            validationResults.msg = 'Statement is too short'
            return validationResults
        }
    },
    'default': (fieldValue, fieldName, validationResults) => {
        if (fieldValue.length < DEFAULT_FIELD_REQUIRED_SIZE) {
            validationResults.isValid = false
            validationResults.msg = camelCaseToSentenceCase(fieldName) + ' is too short.'
            return validationResults
        } 
    }
}

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
        if (!optionalFields.includes(objectProperty)) {
            let fieldRule = argumentRules[objectProperty]
            let customValidationResults
            if (fieldRule) {
                customValidationResults = fieldRule(form[objectProperty], validationResults)
            } else {
                fieldRule = argumentRules['default']
                customValidationResults = fieldRule(form[objectProperty], objectProperty, validationResults)
            }
            if (!validationResults.isValid) return validationResults
        }
    }
    return validationResults
}

export {
    validateArgFormNotEmpty
}