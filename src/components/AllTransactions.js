// @flow

import React from 'react'

import type { User } from '../api'
import { getTransactionsByDate } from '../api'
import { Segment, Header } from 'semantic-ui-react'
import { ListTransactions } from './TransactionView'
import { Filter } from './Filter'
// ./file, otherwise the file is searched in node_modules



export type Props = {
  token: string,
  user: User,
}


class AllTransactions extends React.Component {

  state: {
    transactions: transactions
  }

  state = {
    transactions: []
  }


  updateTransactionsByDate(token: string, startDate: string, endDate: string) {
    getTransactionsByDate(token, startDate, endDate)
      .then(({result: transactions}) =>
        this.setState({transactions})
    )
  }

  render() {
    return (
      <Segment>
        <Header as='h2' attached='top'>
          All Transactions
        </Header>
        <Segment attached>
          <Filter updateTransactionsByDate={this.updateTransactionsByDate.bind(this)} token={this.props.token}/>
          <ListTransactions transactions={this.state.transactions}/>
        </Segment>
      </Segment>
    )
  }
}

export default AllTransactions
