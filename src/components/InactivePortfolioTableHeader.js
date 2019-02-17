import React from "react";
import { Table } from "semantic-ui-react";

export class InactivePortfolioTableHeader extends React.Component {
  render() {
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            {" "}
            <b>Company Name</b>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <b>Purchased Price</b>
          </Table.HeaderCell>
          <Table.HeaderCell>Sold Price</Table.HeaderCell>
          <Table.HeaderCell>Gain/Loss</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    );
  }
}
