import React, {useState} from 'react'
import styled from 'styled-components'
import {ExpandCollapse} from '../atoms/ExpandCollapse'
import Button from '../atoms/Button'

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
        sourceList = JSON.parse(sourceList)
        sourceList = sourceList.map((elem, index) => {
            return (
                <div key={index}>
                    [{index + 1}] {elem}
                    <hr/>
                </div>
            )
        })

        return <ExpandCollapse render={sourceList}/>

    }

    const renderRoot = () => {
        let nodes = props.nodes
        let root = nodes.filter(node => node.root)[0]

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

    const renderScrollToTheTop = (label, style) => {
        return (
            <div style={style} onClick={() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            }}>
                <div>
                    &#8963;
                </div>
                <div>
                    {label}
                </div>
            </div>
        )
    }

    const renderResponseOptions = () => {
        return (
            <Button text='Respond' 
                style={{
                    backgroundColor: '#a9a8a8',
                    fontSize: '18pt',
                    marginTop: '1%'
                }}
                onClick={() => alert('will load attack component for arg with ID: ' + props.nodes.filter(node => node.root)[0].id)}
            />
        )
    }

    return (
        <div>
            {renderScrollToTheTop('View graph')}
            {renderRoot()}
            {renderScrollToTheTop('Go to the top', {marginBottom: '5%'})}
        </div>
    )
}

export default ViewArgsRegular