import React, { Component, PropTypes } from 'react';
import Meter from 'grommet/components/Meter';
import RestWatch from 'grommet/utils/RestWatch';

export default class RestWatchMeter extends Component {

  constructor(props) {
    super(props);

    this._getData = this._getData.bind(this);
    this._onUpdate = this._onUpdate.bind(this);

    this.state = {
      value: this.props.value,
      max: this.props.max,
      warnvalue: this.props.max - (this.props.max / 4),
      errvalue: this.props.max - (this.props.max / 8)
    };

    this._getData();
  }

  _onUpdate(result) {
    if (result.value > this.state.max) {
      this.setState({ max: result.value, warnvalue: result.value - (result.value / 4), errvalue: result.value - (result.value / 8) });
    }

    this.setState({ value: result.value });
    // console.log("_onUpdate", result, this);
  }

  _getData() {
    const params = { "name": this.props.name, "uuid": this.props.uuid };

    RestWatch.initialize(this.props.wsURL);
    RestWatch.start(this.props.wsURL, params, this._onUpdate);
    // console.log("getData", this);
  }

  render() {
    // console.log("render", this);
    return (
      <Meter type="arc" value={this.state.value} units="" min={{ "value": 0 }} max={{ "value": this.state.max }} thresholds={[{ "label": "Warning", "value": this.state.warnvalue, "colorIndex": "warning" }, { "label": "Error", "value": this.state.errvalue, "colorIndex": "error" }]} />
    );
  }
}

RestWatchMeter.propTypes = {
  name: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  wsURL: PropTypes.string.isRequired
};
