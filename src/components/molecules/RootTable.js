import React, { useState } from 'react'
import { redirectTo } from '../../util/redirect'
import { readArgument } from '../../data/routes'
import Button from '../atoms/Button'
import styled from 'styled-components'
import SearchField from '../atoms/SearchField'
import Search from '../../data/Search'


const Table = styled.table`
    width: 100%;
    table-layout: fixed;
    margin-top: 3%;
`

const Roots = styled.div`
    margin-bottom: 5%;
`

const RootTable = (props) => {
    const [rootsToShow, setRootsToShow] = useState(props.roots)
    const searchKeys = [
        'statement',
        'action',
        'circumstance',
        'newCirumstance',
        'sourceList',
        'value',
        'goal',
        'argumentBasis'
    ]

    const search = (searchTerm) => {
        let searcher = new Search(props.roots, searchKeys)
        setRootsToShow(searcher.search(searchTerm))
    }

    const clear = () => setRootsToShow(props.roots)

    const renderTable = () => {
        let renderedRoots = rootsToShow.map((root, i) => {
            return (
                <tr key={i}>
                    <td>
                        <Button onClick={() => {
                            redirectTo(props.history, readArgument.use + root.id)
                            }}
                            style={{
                                fontSize: '12pt',
                                fontWeight: '300',
                            }}
                            text={root.statement}
                        />
                    </td>
                    <td>
                        {new Date(root.createdAt).toLocaleString()}
                    </td>
                </tr>
            )
        })

        return (
            <Roots>
                <SearchField search={search} clear={clear}/>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                Statement
                            </th>
                            <th>
                                Posted on
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedRoots}
                    </tbody>
                </Table>
                {rootsToShow.length === 0 ? 
                    <div>No relevant arguments found.</div>
                    : ''
                }
            </Roots>
        )
    }

    return renderTable()
}

export default RootTable

