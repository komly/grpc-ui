import React from 'react';

const Navbar = ({ onConnect, addr, setAddr }) => (
  <div className="navbar">
    <div className="navbar__container">
      <a href="" className="logo navbar__logo" />

      <form
        className="host-form navbar__host-form"
        action=""
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          onConnect(addr);
        }}
      >
        <input
          className="host-form__input"
          type="text"
          name="host"
          placeholder="Target grpc host address"
          value={addr}
          onChange={e => {
            setAddr(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Connect
        </button>
      </form>
    </div>
  </div>
);

export default Navbar;
