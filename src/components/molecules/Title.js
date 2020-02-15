import React from 'react'
import {Helmet} from 'react-helmet'

const Title = (props) => {
    const BASE_TITLE = props.title ? 'Argupedia | ' + props.title : 'Argupedia'
    return <Helmet>
        <title>{BASE_TITLE}</title>
    </Helmet>
}

export default Title