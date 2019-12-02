import * as Yup from 'yup'
const ArgumentSchema = Yup.object().shape({
    statement : Yup.string()
        .min(5, 'Too short!')
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
    sourceList: Yup.string()
        .notRequired()
    })

export {
    ArgumentSchema
}