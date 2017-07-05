// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Segment, Button, Header, Message } from 'semantic-ui-react'
import { FormField } from './FormExtensions'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (login: string, password: string, callback: (error: ?Error) => void) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string,
    }
  }
}


class Login extends React.Component {

  props: Props

  state: {
    login?: string,
    loginLengthOK: boolean,
    password: string,
    passwordLengthOK: boolean,
    error?: Error,
    errorMessage: string,
    redirectToReferrer: boolean
  }

  state = {
    login: "",
    loginLengthOK: false,
    password: "",
    passwordLengthOK: false,
    error: null,
    errorMessage: "",
    redirectToReferrer: false
  }


  handleLogin = (event: Event) => {
    event.preventDefault()
    const { login, loginLengthOK, password, passwordLengthOK } = this.state

    if(!loginLengthOK || !passwordLengthOK) {
      var message = 'Username and password have to be at least 3 characters.'
      this.setState({error: new Error(), errorMessage: message})
      return
    }

    this.props.authenticate(login, password, (error) => {
      if(error) {
        this.setState({error, errorMessage: 'Login failed.'})
      } else {
        this.setState({redirectToReferrer: true, error: null})
      }
    })
  }

  updateFieldState = (update) => {
    this.setState(update)
  }


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer, error, errorMessage, login, loginLengthOK,
            password, passwordLengthOK } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }

    return (
      <Segment>
        <Header as='h2' attached='top'>
          Welcome to the Finance Portal.
        </Header>
          <Segment piled attached>
            <Form>
              <FormField updateFieldState={this.updateFieldState} stateName='login' label='User name' placeholder='User'
                minLength={3} fieldValue={login} fieldLengthOK={loginLengthOK} />
              <FormField updateFieldState={this.updateFieldState} stateName='password' label='Password' placeholder='Password'
                minLength={3} type='password' fieldValue={password} fieldLengthOK={passwordLengthOK}/>
              <Button size='large' content='Login' onClick={this.handleLogin} />
            </Form>
          </Segment>
        {error && <Message error header='Error' content={errorMessage} />}
      </Segment>
    )
  }
}

export default Login
