const motivationSchemas = [
     {
        id: 'argumentFromPositionToKnow',
        label: 'Position to know',
        criticalQuestions: [
            'Is the writer really in a position to know if their argument is true?',
            'What is it about the writer that makes them likely to know about their topic?',
            'Is the writer an honest, trustworthy and reliable source?',
            'Does the writer have any reason to mislead us?'
        ]
    },
    {
        id: 'appealToExpertOpinion',
        label: 'Expert Opinion',
        criticalQuestions: [
            'How credible is the writer as an Expert?',
            'Is the writer an expert in the same area as their argument?',
            'What did the writer assert that implies their argument?',
            'Do we have a reason to think the writer is less than honest?',
            'Is the argument consistent with what other experts assert?',
            'Is the argument based on reliable and credible evidence?'
        ]
    },
    {
        id: 'appealToPopularOpinion',
        label: 'Appeal to popular opinion',
        criticalQuestions: [
            'What evidence do we have for believing that the argument is generally accepted?',
            'Even if the argument is generally accepted as being true, are there good reasons for doubting its veracity?'
        ]
    },
    {
        id: 'argumentFromAnalogy',
        label: 'Argument from analogy',
        criticalQuestions: [
            'Is the argument really true in the given situations?',
            'Are there differences in the situations given that would tend to undermine the force of the similarly cited?',
            'Is there some other case that is similar to the given cases but doesn\'t fit with the overall argument?'
        ]
    },
    {
        id: 'argumentFromCorrelationToCause',
        label: 'Argument from correlation to cause',
        criticalQuestions: [
            'Is there really a correlation between the points raised?',
            'Is there any reason for thinking the correlation is anything more than coincidence?',
            'Could there be a different factor involved that isn\'t mentioned here, but is still a cause?'
        ]
    },
    {
        id: 'argumentFromPostiveNegativeConsequences',
        label: 'Argument from positive/negative consequence',
        criticalQuestions: [
            'How strong is the probability or plausibility that these cited consequences will (may, might, must) occur?',
            'What evidence supports the claim that these consequences will (may, might, must) occur?',
            'Are there consequences of the opposite value that ought to be taken into account?',
            'Is the argument really good/bad?'
        ]
    },
    {
        id: 'slipperySlopeArgument',
        label: 'Slippery slope argument',
        criticalQuestions: [
            'What intervening propositions in the sequence linking the actions are actually given?',
            'What other steps are required to fill in the sequence of actions to make sense?',
            'What are the weakest links in the sequence of actions, the places where key critical questions must be asked?'
        ]
    },
]

export default motivationSchemas