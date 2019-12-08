import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {ExpandCollapse} from '../atoms/ExpandCollapse'
import Button from '../atoms/Button'
import {ScrollToTop} from '../../util/scrollTo'
import ResponseForm from './ResponseForm'

const Argument = styled.div`
    margin: 5%;
    padding: 1%;
    background-color: #f3f3f3;
`
const Statement = styled.h1`
    margin-bottom: 4%;
`

const Label = styled.div`
    font-style: italic;
    font-size: 12pt;
    color: gray;
`

const Point = styled.div`
    font-size: 18pt;
    margin-bottom: 2%;
    white-space: pre-wrap;
    text-align: left;
`

const ViewArgsRegular = (props) => {
    const [root, setRoot] = useState()

    useEffect(() => {
        let nodes = props.nodes
        setRoot(nodes.filter(node => node.root)[0])
    }, [props.nodes])

    const propertiesToRender = {
        'circumstance' : {
            label: 'Current circumstance'
        }, 
        'action' : {
            label: 'Required action'
        }, 
        'newCircumstance' : {
            label: 'New circumstance'
        }, 
        'goal' : {
            label: 'Goal achieved'
        }, 
        'value' : {
            label: 'Values promoted'
        }, 
        'sourceList' : {
            label: 'Extra reading'
        }, 
    }

    const renderSourceList = (sourceList) => {
        if (sourceList) {
            sourceList = JSON.parse(sourceList)
            sourceList = sourceList.map((elem, index) => {
                return (
                    <div key={index}>
                        [{index + 1}] {elem}
                        <hr/>
                    </div>
                )
            })
        } else {
            sourceList = 'None'
        }
        
        return (<ExpandCollapse 
            openIcon='Show +' 
            closeIcon='Hide -'
            render={sourceList}/>)

    }

    const renderRoot = () => {
        if (!root) return;
        let argumentPoints = JSON.parse(JSON.stringify(propertiesToRender))
        argumentPoints = Object.keys(argumentPoints).map (point => {
            return {
                field: {
                    machineName: point,
                    label: propertiesToRender[point].label,
                    argVal: root[point] 
                }
            }
        })

        let renderedRoot = Object.keys(argumentPoints).map((prop, index) => {
            let point = argumentPoints[prop].field
            if (propertiesToRender[point.machineName]) {
                return (
                    <div key={index}>
                        <Label>
                            {point.label}
                        </Label>
                        {point.machineName === 'sourceList' ? renderSourceList(point.argVal) : 
                            <Point>
                                {point.argVal ? point.argVal : <small><i>None given</i></small>}
                            </Point>
                        }
                        
                    </div>
                )
            }
        })

        return (
            <Argument>
                <Statement>
                    {root.statement}
                </Statement>
                <div>
                    {renderedRoot}
                </div>
                {renderResponseOptions()}
            </Argument>
        )
    }

    const renderResponseOptions = () => {
        let respondButton = (
            <div>
                <Button text='Respond' 
                    style={{
                        backgroundColor: '#a9a8a8',
                        fontSize: '18pt',
                        marginTop: '1%'
                    }}
                />
            </div>
        )
        
        return (
            <ExpandCollapse 
            openIcon={respondButton}
            closeIcon={respondButton}
            render={<ResponseForm root={root} renderedProperties={propertiesToRender}/>}
            />
        )
    }

    return (
        <div>
            <ScrollToTop label='View graph'/>
            {renderRoot()}
            <ScrollToTop label='Go to the top' style={{marginBottom: '5%'}}/>
        </div>
    )
}

export default ViewArgsRegular