import React from 'react'
import { Table } from 'semantic-ui-react'


function getLocaleDate(inputDate) {
  var date = new Date(inputDate)
  date.setHours(date.getHours() -2)
  var dd = date.getDate()
  var mm = date.getMonth()+1 //January is 0
  var yyyy = date.getFullYear()

  if(dd<10){ dd='0'+dd }
  if(mm<10){ mm='0'+mm }

  return `${dd}.${mm}.${yyyy}`
}


export function ListTransactions (props) {

  const transactions = props.transactions.map(({from, target, amount, total, date}, index)   =>
    <Table.Row key={index}>
      <Table.Cell className="date">{getLocaleDate(date)}</Table.Cell>
      <Table.Cell>{from}</Table.Cell>
      <Table.Cell>{target}</Table.Cell>
      <Table.Cell>{parseFloat(amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Table.Cell>
      <Table.Cell>{total? parseFloat(total).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}</Table.Cell>
    </Table.Row>
  )

  return (
    <div className="transactions">
      <Table singleLine basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Source</Table.HeaderCell>
            <Table.HeaderCell>Target</Table.HeaderCell>
            <Table.HeaderCell>Amount [CHF]</Table.HeaderCell>
            <Table.HeaderCell>Balance [CHF]</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {transactions}
        </Table.Body>
      </Table>
    </div>
  );
}
