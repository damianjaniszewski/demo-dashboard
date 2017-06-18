import React, { Component } from 'react';
import App from 'grommet/components/App';
import Title from 'grommet/components/Title';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Button from 'grommet/components/Button';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Menu from 'grommet/components/Menu';
import AddToQueueForm from './AddToQueue';
import RestWatchMeter from './RestWatchMeter';
import Rest from 'grommet/utils/Rest';
import uuid from 'uuid';

export default class DemoDashboard extends Component {

  constructor() {
    super();

    this._onAddToQueue = this._onAddToQueue.bind(this);
    this._onAddToQueueCancel = this._onAddToQueueCancel.bind(this);
    this._onAddToQueueItems = this._onAddToQueueItems.bind(this);

    this.state = {
      addToQueue: false,
      queueUUID: uuid.v4(),
      instUUID: uuid.v4(),
      cpuUUID: uuid.v4(),
      cpuavgUUID: uuid.v4(),
      clientsUUID: uuid.v4(),
      // producerURL: 'http://demo-producer'+window.location.hostname.substring(window.location.hostname.indexOf("."))+'/',
      // controllerURL: 'ws://demo-controller'+window.location.hostname.substring(window.location.hostname.indexOf("."))+'/ws'
      // producerURL: 'http://demo-producer.stackato.local/',
      // controllerURL: 'ws://demo-controller.stackato.local/ws'
      producerURL: 'http://demo-producer.stackato.dc01.pl/',
      controllerURL: 'ws://demo-controller.stackato.dc01.pl/ws'
      // producerURL: process.env.producerURL,
      // controllerURL: process.env.controllerURL
    };
    console.log('producerURL:', this.state.producerURL);
    console.log('controllerURL:', this.state.controllerURL);
  }

  _onAddToQueue() {
    this.setState({ addToQueue: true });
  }

  _onAddToQueueItems(e) {
    console.log("_onAddToQueueItems: ", e);

    var request = Rest.post(this.state.producerURL + e.items, {}).end();
    console.log("_onAddToQueueItems:", request);

    this.setState({ addToQueue: false });
  }

  _onAddToQueueCancel() {
    this.setState({ addToQueue: false });
  }

  render() {

    let addToQueueLayer;
    if (this.state.addToQueue) {
      addToQueueLayer = (
        <AddToQueueForm onClose={this._onAddToQueueCancel} onSubmit={this._onAddToQueueItems} />
      );
    }

    return (
      <App centered={false} inline={true}>
        {addToQueueLayer}
        <Box flex={true} pad='none' full='vertical'>
          <Header direction='row' justify='between' pad={{ horizontal: 'medium' }} colorIndex='neutral-1'>
            <Title>HPE Helion Cloud Native Applications Platform</Title>
            <Menu direction="column" justify="end" align="center">
              <Button icon={<MenuIcon />} onClick={this._onAddToQueue} />
            </Menu>
          </Header>
          <Section flex={true} primary={true} pad={{ horizontal: 'medium' }}>
            <Tiles fill={true} flush={true} pad={{ horizontal: 'small' }} size={'small'}>
              <Tile pad={{ vertical: 'small' }}>
                <Header justify='center'>Queue length</Header>
                <RestWatchMeter uuid={this.state.queueUUID} name='Queue' value={0} max={16} wsURL={this.state.controllerURL} />
              </Tile>
              <Tile pad={{ vertical: 'small' }}>
                <Header justify='center'>Consumer instances</Header>
                <RestWatchMeter uuid={this.state.instUUID} name='Instances' value={0} max={8} wsURL={this.state.controllerURL} />
              </Tile>
              <Tile pad={{ vertical: 'small' }}>
                <Header justify='center'>Total CPU</Header>
                <RestWatchMeter uuid={this.state.cpuUUID} name='CPU' value={0} max={100} wsURL={this.state.controllerURL} />
              </Tile>
              <Tile pad={{ vertical: 'small' }}>
                <Header justify='center'>Avg CPU</Header>
                <RestWatchMeter uuid={this.state.cpuavgUUID} name='CPUavg' value={0} max={100} wsURL={this.state.controllerURL} />
              </Tile>
                <Tile pad={{ vertical: 'small' }}>
                <Header justify='center'>Clients</Header>
                <RestWatchMeter uuid={this.state.clientsUUID} name='Clients' value={0} max={100} wsURL={this.state.controllerURL} />
              </Tile>  
            </Tiles>
          </Section>
          <Footer direction='row' justify='between' pad={{ horizontal: 'medium', vertical: 'small' }} colorIndex='neutral-1'>
            <img src="img/HPE_log_left_wht.png" width="8%" height="8%" />
            Transform to a Hybrid Infrastructure&nbsp;|&nbsp;Cloud Native Applications
          </Footer>
        </Box>
      </App>
    );
  }
};
