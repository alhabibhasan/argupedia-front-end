import React from 'react'
import {withRouter } from 'react-router-dom'
import RootTable from '../molecules/RootTable'


const ViewRootsRegular = (props) => {

    return (
        <div>
            <h1>
                {props.header}
            </h1>

            <RootTable history={props.history} roots={props.nodes}/>
        </div>
    )
}

export default withRouter(ViewRootsRegular)