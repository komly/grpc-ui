import React from 'react';
import './Sidebar.scss';

export default props => {
  return (
    <div className="sidebar">
      <ul className="sidebar__packages-list">
        {Object.keys(props.packages).map(p => (
          <li key={p}>
            {p}
            <ul className="sidebar__services-list">
              {props.packages[p].map(s => (
                <li key={s}>
                  {s.name}
                  <ul className="sidebar__methods-list">
                    {s.methods.map(m => (
                      <li key={m.name}>
                        <a href="" className="sidebar__link">
                          {m.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
