import React, {useState} from 'react'
import Button from './Button'
import styled from 'styled-components'

const SearchBar = styled.div`
    margin-top: 3%;
`

const SearchField = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const clearButtonStyle = {
        fontSize: '12pt',
        marginLeft: '5px',
        marginRight: '1px',
        color: 'black',
        marginLeft: '-25px'
    }
    const searchButtonStyle = {
        fontSize: '12pt',
        marginLeft: '5px',
        marginRight: '1px',
        color: 'black',
    }

    const renderSearchField = () => {
        return (
            <SearchBar>
                <span>
                    <input type="text" 
                        value={searchTerm}
                        placeholder='Enter search terms...'
                        onKeyDown={e => e.key === 'Enter' ? props.search(searchTerm) : false}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{
                            width: '50%',
                        }}
                        />
                    <Button 
                        text={<span>&#10539;</span>} 
                        onClick={() => {
                            props.clear()
                            setSearchTerm('')
                        }}
                        style={clearButtonStyle}/>
                </span>

                <Button 
                    text={'Search'} 
                    onClick={() => props.search(searchTerm)}
                    style={searchButtonStyle}/>
                
            </SearchBar>
        )
    }

    return renderSearchField()
}

export default SearchField