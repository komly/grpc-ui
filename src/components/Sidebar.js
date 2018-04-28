import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.div`
  padding-top: 30px;
  width: 30%;
  float: left;
`;

const Link = styled.a`
  &:hover {
    color: rgb(4, 172, 180);
    text-decoration: none;
  }
`;

const MethodsList = ({ methods }) => (
  <ul style={{ margin: 0, paddingLeft: '10px' }}>
    {methods.map(m => (
      <li key={m.name}>
        <Link>{m.name}</Link>
      </li>
    ))}
  </ul>
);

const ServicesList = ({ package_ }) => (
  <ul style={{ margin: 0, paddingLeft: '10px' }}>
    {package_.map(s => (
      <li key={s.name}>
        {s.name}
        <ul>
          <MethodsList methods={s.methods} />
        </ul>
      </li>
    ))}
  </ul>
);

export default props => (
  <Sidebar>
    <ul style={{ margin: 0, paddingLeft: '0px', listStyle: 'none' }}>
      {Object.keys(props.packages).map(p => (
        <li key={p}>
          {p}
          <ServicesList package_={props.packages[p]} />
        </li>
      ))}
    </ul>
  </Sidebar>
);
