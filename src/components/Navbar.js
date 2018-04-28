import React, { Component } from 'react';

interface NavbarPropType {
  onSubmit(string): void;
}
interface NavbarStateType {
  addr: string;
}

class Navbar extends Component<NavbarPropType, NavbarStateType> {
  constructor(props: NavbarPropType) {
    super(props);
    this.state = {
      addr: props.addr || ''
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.changeAddr(this.state.addr);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="navbar">
        <div className="navbar__container">
          <a href="/" className="logo navbar__logo" />
          <form
            className="host-form navbar__host-form"
            action=""
            method="POST"
            onSubmit={this.handleSubmit}
          >
            <input
              onChange={this.handleChange}
              value={this.state.addr}
              className="host-form__input"
              type="text"
              name="addr"
              placeholder="Target grpc host address"
            />
            <button className="button" type="submit">
              Connect
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Navbar;
