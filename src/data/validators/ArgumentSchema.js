import * as Yup from 'yup'
const ArgumentSchema = Yup.object().shape({
    statement : Yup.string()
        .min(5, 'Too short!')
        .max(250, 'Keep it short and snappy!')
        .required('Required!'),
    circumstance : Yup.string()
        .min(5, 'Too short!')
        .required('Required!'),
    action : Yup.string()
        .min(5, 'Too short!')
        .required('Required!'),
    newCircumstance : Yup.string()
        .min(5, 'Too short!')
        .required('Required!'),
    goal : Yup.string()
        .min(5, 'Too short!')
        .required('Required!'),
    value : Yup.string()
        .min(5, 'Too short!')
        .required('Required!'),
    argumentBasis: Yup.string()
        .notOneOf(['default'], 'You need to select an argument basis')
        .required('Required!'),
    sourceList: Yup.string()
        .notRequired()
    })

const ResponseSchema = Yup.object().shape({
    statement : Yup.string()
        .required('Required!'),
    circumstance : Yup.string()
        .notRequired(),
    action : Yup.string()
        .notRequired(),
    newCircumstance : Yup.string()
        .notRequired(),
    goal : Yup.string()
        .notRequired(),
    value : Yup.string()
        .notRequired(),
    argumentBasis: Yup.string()
        .notOneOf(['default'], 'You need to select an argument basis')
        .required(),
    sourceList: Yup.string()
        .notRequired(),
    })

export {
    ArgumentSchema,
    ResponseSchema
}