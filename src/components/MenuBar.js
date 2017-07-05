import React from 'react'
import { Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export function MenuBarDrawer (props) {

  var isAuthenticated = props.isAuthenticated
  var user = props.user

  if(isAuthenticated && user) {
    return (
      <nav>
        {/* Links inside the App are created using the react-router's Link component */}
        <Menu inverted>
          <Menu.Item className="page-title">
            WED3 Attestation / Solution - Dashboard
          </Menu.Item>
          <Menu.Item>
            <Link to="/dashboard">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/transactions">Account Transactions</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button><a href="/logout" onClick={(event) => {
                event.preventDefault()
                props.signout(() => props.history.push('/'))
              }}>Logout {user.firstname} {user.lastname}</a></Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </nav>
    )
  } else {
    return (
      <nav>
        {/* Links inside the App are created using the react-router's Link component */}
        <Menu inverted>
          <Menu.Item className="page-title">
            WED3 Attestation / Solution
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button>
                <Link to="/signup">Register</Link>
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </nav>
    )
  }
}
