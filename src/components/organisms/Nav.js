import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import {redirectTo} from '../../util/redirect'
import { withRouter } from 'react-router-dom'
import {index, roots, createArgument, readArgument} from '../../data/routes'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={() => redirectTo(props.history, index.use)}>Argupedia</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => redirectTo(props.history, index.use)}>Home</NavLink>
            </NavItem>
            <NavItem>
            <NavLink onClick={() => redirectTo(props.history, roots.use)}>View roots</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default withRouter(Navigation)