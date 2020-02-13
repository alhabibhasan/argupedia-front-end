const motivationSchemas = {
    schemes : {
        'someId-1' : {
            criticalQuestions : [ 
                'Is the writer really in a position to know if their argument is true?',
                'What is it about the writer that makes them likely to know about their topic?',
                'Is the writer an honest, trustworthy and reliable source?',
                'Does the writer have any reason to mislead us?',
                'How can the writer guarantee that the required action will lead to the new circumstances?',
             ],
            label: 'Position to know',
        },
        'someId-2' : {
            criticalQuestions : [
                'How credible is the writer as an Expert?',
                'Is the writer an expert in the same area as their argument?',
                'What did the writer assert that implies their argument?',
                'Do we have a reason to think the writer is less than honest?',
                'Is the argument consistent with what other experts assert?',
                'Is the argument based on reliable and credible evidence?',
            ],
            label: 'Expert Opinion',
        },
        'someId-3' : {
            criticalQuestions : [
                'What evidence do we have for believing that the argument is generally accepted?',
                'Even if the argument is generally accepted as being true, are there good reasons for doubting its veracity?',
                'Even if the argument is generally accepted, how ethical and moral is it?',
                'Will the resulting action promote values of inclusivity and diversity?',
            ],
            label: 'Appeal to popular opinion',
        },
        'someId-4' : {
            criticalQuestions : [
                'Is the argument really true in the given situations?',
                'Are there differences in the situations given that would tend to undermine the force of the similarly cited?',
                'Is there some other case that is similar to the given cases but doesn\'t fit with the overall argument?',
            ],
            label: 'Argument from analogy',
        },
        'someId-5' : {
            criticalQuestions : [  
                'Is there really a correlation between the points raised?',
                'Is there any reason for thinking the correlation is anything more than coincidence?',
                'Could there be a different factor involved that isn\'t mentioned here, but is still a cause?',
                'Is the suggested action neccessarily a good thing?',
            ],
            label: 'Argument from correlation to cause',
        },
        'someId-6' : {
            criticalQuestions : [
                'How strong is the probability or plausibility that these cited consequences will (may, might, must) occur?',
                'What evidence supports the claim that these consequences will (may, might, must) occur?',
                'Are there consequences of the opposite value that ought to be taken into account?',
                'Is the argument really good/bad?',
            ],
            label: 'Argument from positive/negative consequence',
        },
        'someId-7' : {
            criticalQuestions : [
                'What intervening propositions in the sequence linking the actions are actually given?',
                'What other steps are required to fill in the sequence of actions to make sense?',
                'Is the required action a step towards opening a set of doors that cannot be closed?',
                'Is the current situation necessarily a bad thing? Is the writer missing out a crucial detail?',
                'Is the writer misinformed about the facts of the current situation?',
            ],
            label: 'Slippery slope argument',
        }
    }
}

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
    let schemes = motivationSchemas.schemes
    let schemeArr = []
    for (let elem in schemes) {
        schemeArr.push(schemes[elem])
    }
    return schemeArr
}

export { 
    getSchemes,
    getDefaultCriticalQuestions,
}