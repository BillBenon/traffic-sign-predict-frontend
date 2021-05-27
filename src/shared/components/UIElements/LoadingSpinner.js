import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    // <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
    //   <div className="lds-dual-ring"></div>
    // </div>
    <div className={`${props.asOverlay && 'lds-spinner'}`}>
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  );
};

export default LoadingSpinner;
