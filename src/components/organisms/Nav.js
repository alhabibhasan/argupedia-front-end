import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown, 
  DropdownItem, 
  DropdownToggle, 
  DropdownMenu,
} from 'reactstrap'
import {redirectTo} from '../../util/redirect'
import { withRouter } from 'react-router-dom'
import {index, roots, auth} from '../../data/routes'
import { userLoggedInAndEmailVerified } from '../../data/auth/user-checks'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [accountDropdownOpen, setAccountDropdown] = useState(false)

  const toggleNavOpen = () => setIsOpen(!isOpen)
  const toggleAccountDropdown = () => setAccountDropdown(!accountDropdownOpen)

  return (
    <div>
      <Navbar color="light" light expand="lg" fixed="top">
        <NavbarBrand onClick={() => redirectTo(props.history, index.use)}>Argupedia</NavbarBrand>
        <NavbarToggler onClick={toggleNavOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => redirectTo(props.history, index.use)}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => redirectTo(props.history, roots.use)}>View roots</NavLink>
            </NavItem>

            {userLoggedInAndEmailVerified(props.user) ? 
              <Dropdown nav isOpen={accountDropdownOpen} toggle={toggleAccountDropdown}>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => redirectTo(props.history, auth.logout.use)}>Sign out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            :
            <Dropdown nav isOpen={accountDropdownOpen} toggle={toggleAccountDropdown}>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => redirectTo(props.history, auth.login.use)}>Sign in</DropdownItem>
                <DropdownItem onClick={() => redirectTo(props.history, auth.register.use)}>Register</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            }
            
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default withRouter(Navigation)