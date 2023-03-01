import LoadingContext from './LoadingContext';
import * as fcl from '@onflow/fcl';
import { useState, useEffect, useCallback } from 'react';

function LoadingProvider(props) {
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  useEffect(() => {
    if (loading === true) {
      let timeout = setTimeout(() => {
        setStartLoading(true);
      }, 1);
      return () => clearTimeout(timeout);
    } else {
      setStartLoading(false);
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      <div className={'a ' + (startLoading ? 'loading' : '')}></div>
      {props.children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
