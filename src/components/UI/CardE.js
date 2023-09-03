import React from 'react';

import './CardE.css';

const CardE = (props) => {
  const classes = 'card ' + props.className;

  return <div className={classes}>{props.children}</div>;
};

export default CardE;