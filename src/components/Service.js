import React from 'react';
import Method from './Method';

const Service = ({
  service,
  package_name,
  types,
  enums,
  invokeMethod,
  toggleMethod
}) => (
  <div className="package" key={package_name}>
    <h3 className="package__title">{`${package_name} / ${service.name}`}</h3>
    {Object.values(service.methods).map(method => (
      <Method
        key={method.name}
        service_name={service.name}
        package_name={package_name}
        types={types}
        enums={enums}
        invokeMethod={invokeMethod}
        toggleMethod={() => toggleMethod(method.name)}
        {...method}
      />
    ))}
  </div>
);

export default Service;
