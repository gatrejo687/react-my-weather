import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addCity } from '../../redux/actions/locationActions';

class AddCityForm extends Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addCity(this.state.inputValue);
    this.setState({ inputValue: '' }); // clear the form after submitting
  };

  render() {
    const { inputValue } = this.state;

    return (
      <div>
        <form id="addCity" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="_addCity"
            value={inputValue}
            onChange={this.handleChange}
            placeholder="Enter City"
          ></input>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCity: cityName => dispatch(addCity(cityName)),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AddCityForm);
