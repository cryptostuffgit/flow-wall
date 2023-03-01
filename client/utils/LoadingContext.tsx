import { createContext } from 'react';

export const LoadingContext = createContext<any>({
  loading: false,
  setLoading: () => {},
});

export default LoadingContext;
