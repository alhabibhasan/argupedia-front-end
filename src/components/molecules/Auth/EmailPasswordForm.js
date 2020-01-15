import React from 'react'
import styled from 'styled-components'
import Button from '../../atoms/Button'

const Input = styled.input`
    width: 30%;
`

const EmailPasswordForm = (props) => {
    return (
        <form onKeyDown={e => e.key === 'Enter' ? props.onSubmit(e) : false}>
            <p>
                <Input type="email"
                    placeholder="email@address.com"
                    onChange={e => props.setEmail(e.target.value)}/>
            </p>
            <p>
                <Input type="password" 
                    placeholder="Password"
                    onChange={e => props.setPassword(e.target.value)}/>
            </p>

            {props.setPasswordConfirm ? 
                <p>
                    <Input type="password" 
                        placeholder="Confirm password"
                        onChange={e => props.setPasswordConfirm(e.target.value)}/>
                </p>

                :

                ''
            }

            <div>
                <Button text={<span>{props.buttonText}</span>}
                    onClick={props.onSubmit}
                    style={{
                        marginTop: '1%',
                        marginBottom: '1%',
                        fontSize: '14pt',
                        backgroundColor: 'rgb(230, 230, 230)'
                    }}>
                </Button>
            </div> 
        </form>
    )
}

export default EmailPasswordForm