import React from 'react'
import { Form } from 'semantic-ui-react'
import * as DateHelper from './DateHelper'


export class Filter extends React.Component {

  state: {
    year: string,
    month: string
  }

  state = {
    year: new Date().getFullYear().toString(),
    month: DateHelper.getCurrentMonth()
  }

  componentDidMount() {
    this.updateTransactions()
  }

  handleYearChanged = (event: Event) => {
    this.setState({year: event.target.value}, this.updateTransactions)
  }

  handleMonthChanged = (event: Event) => {
    this.setState({month: event.target.value}, this.updateTransactions)
  }

  updateTransactions = () => {
    const { year, month } = this.state
    const { updateTransactionsByDate, token} = this.props

    var fromDate = DateHelper.getStartDate(year, month)
    var toDate = DateHelper.getEndDate(year, month)

    updateTransactionsByDate(token, fromDate, toDate);
  }

  render() {
    return (
      <div>
        <h3>Filter</h3>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field label='Select a year' control='select' value={this.state.year} onChange={this.handleYearChanged}>
              <option value='2015'>2015</option>
              <option value='2016'>2016</option>
              <option value='2017'>2017</option>
            </Form.Field>
            <Form.Field label='Select a month' control='select' value={this.state.month} onChange={this.handleMonthChanged}>
              <option value='01'>January</option>
              <option value='02'>February</option>
              <option value='03'>March</option>
              <option value='04'>April</option>
              <option value='05'>May</option>
              <option value='06'>June</option>
              <option value='07'>July</option>
              <option value='08'>August</option>
              <option value='09'>September</option>
              <option value='10'>October</option>
              <option value='11'>November</option>
              <option value='12'>December</option>
            </Form.Field>
        </Form.Group>
        </Form>
      </div>
    )
  }
}
