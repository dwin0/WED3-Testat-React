import React from 'react'
import { Button } from 'semantic-ui-react'
import { getAccountDetails } from '../api'

export class SuccessfulTransaction extends React.Component {

  state: {
    balance: number,
  }

  state = {
    balance: 0
  }

  componentDidMount() {
    getAccountDetails(this.props.token)
      .then(({accountNr, amount, owner}) =>
        this.setState({balance : amount})
    )
  }

  handleStartOver = (event: Event) => {
    event.preventDefault()
    this.props.updateTransactionStatus(false, 0)
  }

render () {
    return (
      <div>
        <p>Transaction to {this.props.targetAccountNr} succeeded!</p>
        <p>New balance {this.state.balance} CHF</p>
        <Button onClick={this.handleStartOver} size="large" content="Start Over" />
      </div>
    )
  }
}
