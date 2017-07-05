// @flow

import React from 'react'
import { getTransactions } from '../api'
import { Segment, Button, Form, Header, Grid } from 'semantic-ui-react'
import { ListTransactions } from './TransactionView'
import { NewTransaction } from './NewTransaction'
import { SuccessfulTransaction } from './SuccessfulTransaction'
import { Link } from 'react-router-dom'

/*
  Use the api functions to call the API server. For example, the transactions
  can be retrieved and stored in the state as follows:

  getTransactions(this.props.token)
    .then(({result: transactions}) =>
      this.setState({transactions})
    )
*/


export type Props = {
  token: string,
}


class Dashboard extends React.Component {

  props: Props

  state: {
    transactions: transactions,
    transactionCompleted: boolean,
    targetAccountNr?: number
  }

  state = {
    transactions: [],
    transactionCompleted: false
  }

  componentDidMount() {
    this.getAllTransactions(this.props.token)
  }

  getAllTransactions = (token: string) => {
    getTransactions(token)
      .then(({result: transactions}) =>
        this.setState({transactions}))
  }

  updateTransactionStatus = (completed: boolean, targetAccount: number) => {
    this.setState({transactionCompleted: completed, targetAccountNr: targetAccount})
  }

  render() {

    const { token } = this.props
    const { transactionCompleted, targetAccountNr, transactions } = this.state

    return (
        <Grid>
        <Grid.Column  mobile={16} tablet={5} computer={5}>
          <Segment>
            <Form>
              <Header as='h2' attached='top'>
                New Payment
              </Header>
              <Segment attached>
                {transactionCompleted
                  ? <SuccessfulTransaction token={token} targetAccountNr={targetAccountNr} updateTransactionStatus={this.updateTransactionStatus}/>
                  : <NewTransaction token={token} refreshTransactions={this.getAllTransactions} updateTransactionStatus={this.updateTransactionStatus} />}
              </Segment>
            </Form>
          </Segment>
        </Grid.Column>
        <Grid.Column  mobile={16} tablet={11} computer={11}>
          <Segment>
            <Header as='h2' attached='top'>
              Latest Transactions
            </Header>
            <Segment attached>
              <ListTransactions transactions={transactions}/>
              <Button size='large' content='All Transactions' as={Link} to="/transactions"/>
              {/*Button renders as Link, which points to /transactions. The new site is rendered via Route-Element in App.js.*/}
            </Segment>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }

}

export default Dashboard
