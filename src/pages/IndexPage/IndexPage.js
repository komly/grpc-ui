import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Method from '../../components/Method';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import './IndexPage.scss';

const IndexPage = ({ loading, error, packages, onConnect, invoke, addr, setAddr }) => (
  <div>
    <Navbar onConnect={onConnect} addr={addr} setAddr={setAddr} />
    <div className="app">
      <div className="app__container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <div>
            <div className="app__sidebar">
              <Sidebar packages={packages} />
            </div>
            <div className="app__packages-list">
              <div className="packages-list">
                {Object.keys(packages).map(package_name => {
                  return packages[package_name].map(service => {
                    return (
                      <div className="package" key={package_name + ' / ' + service.name}>
                        <h3 className="package__title">{package_name + ' / ' + service.name}</h3>
                        {service.methods.map(method => (
                          <Method key={method.name} in_={method.in} {...method} invoke={invoke(package_name, service.name, method.name)} />
                        ))}
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default IndexPage;
