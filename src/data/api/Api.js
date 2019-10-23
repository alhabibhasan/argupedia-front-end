const getArgumentData = () => {
    return {
        argument: 'This is an argument',
        upvotes: 1,
        downvotes: 4,
        status: 'IN',
        for: [
            {
                argument: 'This is an argument for the argument',
                upvotes: 1,
                downvotes: 4,
                status: 'OUT',
            },
            {
                argument: 'This is another argument for the argument',
                upvotes: 5,
                downvotes: 4,
                status: 'IN',
            }
        ],
        against: [
            {
                argument: 'This is an argument against the argument',
                upvotes: 7,
                downvotes: 4,
                status: 'IN',
            },
            {
                argument: 'This is another argument against the argument',
                upvotes: 10,
                downvotes: 4,
                status: 'IN',
            }
        ]
    }
}