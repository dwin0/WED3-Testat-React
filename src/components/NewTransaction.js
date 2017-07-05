import React from 'react'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { getAccountDetails, getAccount, transfer } from '../api'

export class NewTransaction extends React.Component {

  state: {
    ownAccountNr: string,
    balance: number,
    targetAccountNr?: number,
    targetAccountNrOK: boolean,
    targetAccountName: string,
    targetAmount?: number,
    targetAmountOK: boolean,
    error?: Error,
    errorMessage: string
  }

  state = {
    ownAccountNr: '',
    balance: 0,
    targetAccountNrOK: false,
    targetAccountName: 'Please specify the target account number.',
    targetAmountOK: false,
    error: null,
    errorMessage: ''
  }


  componentDidMount() {
    getAccountDetails(this.props.token)
      .then(({accountNr, amount, owner}) =>
        this.setState({ownAccountNr: accountNr, balance: amount})
    )
  }


  handleTargetAccountChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {

      var targetAccountNr = event.target.value
      this.setState({targetAccountNr: targetAccountNr})

      var message

      if(targetAccountNr.length < 3) {
        message = 'Please specify the target account number.'
        this.setState({targetAccountName: message, targetAccountNrOK: false})
        return
      }

      if(targetAccountNr.length === 7) {
        getAccount(targetAccountNr, this.props.token)
          .then(({targetAccountNr, owner}) => {
            message = `${owner.firstname} ${owner.lastname}`
            this.setState({targetAccountName: message, targetAccountNrOK: true})
            return
          }
        ).catch(function (e) {/*console.log(e)*/})
      }

      message = 'Unknown account number specified.'
      this.setState({targetAccountName: message, targetAccountNrOK: false})
    }
  }


  handleTargetAmountChanged = (event: Event) => {
    if(event.target instanceof HTMLInputElement) {
      var amount = event.target.value
      var targetAmountOK = amount.length > 0 && amount > 0.05
      this.setState({targetAmount: Number(event.target.value), targetAmountOK: targetAmountOK})
    }
  }


  handlePay = (event: Event) => {
    event.preventDefault()
    const { targetAccountNrOK, targetAmountOK, targetAccountNr, targetAmount } = this.state
    const { refreshTransactions, updateTransactionStatus} = this.props

    if(!targetAccountNrOK || !targetAmountOK) {
      var message = 'Please enter a valid account number and a valid amount.'
      this.setState({error: new Error(), errorMessage: message})
      return;
    }

    transfer(targetAccountNr, targetAmount, this.props.token)
      .then(({from, target, amount, total, date}) => {
        refreshTransactions(this.props.token)
        updateTransactionStatus(true, targetAccountNr)
      }).catch(function(e) {
          var message = 'Payment failed. Please check your balance.'
          this.setState({error: new Error(), errorMessage: message})
      }.bind(this))
  }


  render () {

    const { error, errorMessage, ownAccountNr, balance,
              targetAccountName, targetAmount } = this.state

    var printBalance = parseFloat(balance).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return (
      <div>
        <Form.Field>
          <label>From:</label>
          <Input type="text" disabled readOnly
            value={`${ownAccountNr} [${printBalance} CHF]`} />
        </Form.Field>
        <Form.Field>
          <label>To:</label>
          <Input onChange={this.handleTargetAccountChanged} type="number" placeholder="Target Account Number" />
          <p className="formDescription">{targetAccountName}</p>
        </Form.Field>
        <Form.Field>
          <label>Amount [CHF]:</label>
          <Input onChange={this.handleTargetAmountChanged} type="number" placeholder="Amount in CHF" />
          {targetAmount ? null: <p className="formDescription">Please specify the amount.</p>}
        </Form.Field>
      <Button onClick={this.handlePay.bind(this)} size="large" content="Pay" />
      {/*bind this, because Button is a separate component.*/}
      {error && <Message negative>
          <Message.Header>Error</Message.Header>
          <p>{errorMessage}</p>
        </Message>}
    </div>
    );
  }
}
