import React from 'react';
import { Table } from 'semantic-ui-react';

class Detail extends React.Component {
  generateTable = (data) => {
    const table = data.map((row) => {
      return (
        <Table.Row>
          <Table.Cell>{row.submittedAt}</Table.Cell>
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>{row.response}</Table.Cell>
        </Table.Row>
      );
    });

    return table;
  };

  render() {
    const { submissions } = this.props.data;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Submitted At</Table.HeaderCell>
            <Table.HeaderCell>Submitted By</Table.HeaderCell>
            <Table.HeaderCell>Response</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.generateTable(submissions)}</Table.Body>
      </Table>
    );
  }
}

export default Detail;
