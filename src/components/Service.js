import React from 'react';
import Method from './Method';

const Service = ({ service, package_name, addr, types, enums }) => (
  <div className="package" key={package_name}>
    <h3 className="package__title">{package_name + ' / ' + service.name}</h3>
    {service.methods.map(method => (
      <Method
        key={method.name}
        {...method}
        addr={addr}
        service_name={service.name}
        package_name={package_name}
        types={types}
        enums={enums}
      />
    ))}
  </div>
);

export default Service;
