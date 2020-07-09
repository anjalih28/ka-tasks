import React from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import Summary from './components/Summary';
import Detail from './components/Detail';
import Month from './components/Month';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: [
        {
          name: 'anjali',
          submittedAt: '9 am',
          response: 'abcd',
        },
        {
          name: 'arjun',
          submittedAt: '10 am',
          response: 'abcd',
        },
        {
          name: 'anjali',
          submittedAt: '11 am',
          response: 'abcdefgs',
        },
      ],
    };
  }

  render() {
    return (
      <Grid className="grid">
        <Grid.Row columns={2} className="grid-row">
          <Grid.Column>
            <Month />
          </Grid.Column>
          <Grid.Column>
            <Summary data={this.state} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1} className="grid-row">
          <Detail data={this.state}></Detail>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
