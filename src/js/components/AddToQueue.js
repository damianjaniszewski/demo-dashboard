import React, { Component, PropTypes } from 'react';
import Header from 'grommet/components/Header';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';
import Layer from 'grommet/components/Layer';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Form from 'grommet/components/Form';
import Box from 'grommet/components/Box';

export default class AddToQueueForm extends Component {

  constructor() {
    super();

    this._onSubmit = this._onSubmit.bind(this);
    this._onItemsChange = this._onItemsChange.bind(this);

    this.state = {
      items: 128
    };
  }

  _onSubmit(e) {
    e.preventDefault();
    if (this.state.items) {
      this.props.onSubmit({
        items: this.state.items
      });
    }
  }

  _onItemsChange(e) {
    this.setState({ items: e.target.value });
  }

  render() {
    return (
      <Layer align="right" closer={true} onClose={this.props.onClose}>
        <Header>Add to Queue</Header>
        <Form onSubmit={this._onSubmit}>
          <FormFields>
            <fieldset>
              <FormField label="Nr of Items" htmlFor="itemsId">
                <input type="number" name="items" id="itemsId" onChange={this._onItemsChange} value={this.state.items} />
              </FormField>
            </fieldset>
          </FormFields>
          <Footer pad={{ vertical: 'small' }} justify="end">
            <Box pad={{ horizontal: 'small' }}>
              <Button label="Add" primary={true} onClick={this._onSubmit} />
            </Box>
            <Box>
              <Button label="Cancel" onClick={this.props.onClose} />
            </Box>
          </Footer>
        </Form>
      </Layer>
    );
  }
}

AddToQueueForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
