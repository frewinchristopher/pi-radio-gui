import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Grid, Button, Icon } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

class App extends Component {
  sendCommand(sCommand) {
    axios({
    method: 'post',
    url: 'http://localhost:9999/command',
    data: {
      sCommand: sCommand
    }
  })
  .then(function (oResponse) {
    console.log(oResponse);
    console.log(oResponse.data.sResponse)
  })
  .catch(function (error) {
    console.log(error);
  });

  }
  render() {
    return (
      <div style={{height:'100%'}}>
        <Container style={{height:'100%'}}>
          <Grid textAlign="center" verticalAlign="middle" style={{height:'100%'}}>
            <Grid.Row columns={1}>
              <h1>Chris's Raspberry Pi Radio GUI!</h1>
            </Grid.Row>
            <Grid.Row columns={1}>
              <h2>Stations:</h2>
            </Grid.Row>
            <Grid.Row columns={4}>
              <Button primary className="massive" onClick={() => this.sendCommand('fm4')}>FM4</Button>
              <Button primary className="massive" onClick={() => this.sendCommand('oe1')}>Ö1</Button>
              <Button primary className="massive" onClick={() => this.sendCommand('house')}>HOUSE</Button>
              <Button primary className="massive" onClick={() => this.sendCommand('robo')}>ROBOTRON</Button>
            </Grid.Row>
            <Grid.Row columns={1}>
            <h2>Volume:</h2>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Button primary className="massive" onClick={() => this.sendCommand('volu')}><Icon name='arrow up'/>UP</Button>
              <Button primary className="massive" onClick={() => this.sendCommand('vold')}><Icon name='arrow down'/>DOWN</Button>
            </Grid.Row>
            <Grid.Row columns={1}>
            <h2>Controls:</h2>
            </Grid.Row>
            <Grid.Row columns={1}>
            <Button primary className="massive" onClick={() => this.sendCommand('killmplayer')}><Icon name='stop circle'/>STOP</Button>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
