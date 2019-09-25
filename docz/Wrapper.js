import React, { Fragment } from 'react';
import GlobalStyles from '@ace/global-styles';

function Wrapper({ children }) {
  return (
    <Fragment>
      <GlobalStyles />
      {children}
    </Fragment>
  );
}

export default Wrapper;
