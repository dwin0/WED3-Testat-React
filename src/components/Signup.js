// @flow

import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Segment, Input, Button, Header, Message } from 'semantic-ui-react'
import { signup } from '../api'
import { FormField } from './FormExtensions'

class Signup extends React.Component {

  state: {
    login: string,
    loginLengthOK: boolean,
    firstname: string,
    firstnameLengthOK: boolean,
    lastname: string,
    lastnameLengthOK: boolean,
    password: string,
    passwordLengthOK: boolean,
    confirmationPW: string,
    confirmationPWLengthOK: boolean,
    error: string,
    errorMessage: string,
    redirectToReferrer: boolean
  }

  state = {
    login: "",
    loginLengthOK: false,
    firstname: "",
    firstnameLengthOK: false,
    lastname: "",
    lastnameLengthOK: false,
    password: "",
    passwordLengthOK: false,
    confirmationPW: "",
    confirmationPWLengthOK: false,
    error: null,
    errorMessage: "",
    redirectToReferrer: false
  }


  handleConfirmationPWChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {

      var updates = { confirmationPW: event.target.value }
      var confirmationPWLength = event.target.value.length
      var password = this.state.password

      if(confirmationPWLength !== 0 && confirmationPWLength === password.length) {
        updates.confirmationPWLengthOK = true
      } else {
        updates.confirmationPWLengthOK = false
      }

      this.setState(updates)
    }
  }


  handleSubmit = (event: Event) => {
    event.preventDefault()
    const { login, firstname, lastname, password, loginLengthOK, firstnameLengthOK, lastnameLengthOK,
            passwordLengthOK, confirmationPWLengthOK, confirmationPW } = this.state

    const allFieldsOK = loginLengthOK && firstnameLengthOK && lastnameLengthOK &&
                              passwordLengthOK && confirmationPWLengthOK

    var message

    if(!allFieldsOK) {
      message = 'At least one field is missing some information.'
      this.setState({error: new Error(), errorMessage: message})
      return
    }

    if(confirmationPW !== password) {
      message = 'Password does not match.'
      this.setState({error: new Error(), errorMessage: message})
      return
    }

    signup(login, firstname, lastname, password).then(result => {
      this.props.authenticate(login, password, (error) => {
        if(error) {
          message = 'Login failed.'
          this.setState({error: new Error(), errorMessage: message})
        } else {
          message = ''
          this.setState({redirectToReferrer: true, error: null, errorMessage: message})
        }
      })
    }).catch(error => {
      message = 'Registration failed.'
      this.setState({error: error, errorMessage: message})
    })
  }


  updateFieldState = (update) => {
    this.setState(update)
  }


  render() {
    const { redirectToReferrer, error, firstname, firstnameLengthOK, lastname, lastnameLengthOK,
            login, loginLengthOK, password, passwordLengthOK, confirmationPW, confirmationPWLengthOK } = this.state

    if (redirectToReferrer) {
      return (
        <Redirect to='/dashboard'/>
      )
    }

    return (
      <Segment>
        <Form>
          <Header as='h2' attached='top'>
            Welcome to the Finance Portal.
          </Header>
          <Segment piled attached>
            <FormField updateFieldState={this.updateFieldState} stateName='firstname' label='First name' placeholder='First name'
              minLength={1} fieldValue={firstname} fieldLengthOK={firstnameLengthOK} />
            <FormField updateFieldState={this.updateFieldState} stateName='lastname' label='Last name' placeholder='Last name'
              minLength={1} fieldValue={lastname} fieldLengthOK={lastnameLengthOK} />
            <FormField updateFieldState={this.updateFieldState} stateName='login' label='User name' placeholder='User'
              minLength={3} fieldValue={login} fieldLengthOK={loginLengthOK} />
            <FormField updateFieldState={this.updateFieldState} stateName='password' label='Password' placeholder='Password'
              minLength={3} fieldValue={password} fieldLengthOK={passwordLengthOK} type='password' />
            <Form.Field>
              <label>Confirm Password:</label>
              <Input onChange={this.handleConfirmationPWChanged} placeholder='Password' type="password" value={confirmationPW} />
              {confirmationPWLengthOK ? null : <p className='formDescription'>Please confirm your password.</p>}
            </Form.Field>
            <Button size='large' content='Register' onClick={this.handleSubmit} />
          </Segment>
        </Form>
        {error && <Message error header='Error' content={this.state.errorMessage} />}
      </Segment>
    )
  }
}

export default Signup
