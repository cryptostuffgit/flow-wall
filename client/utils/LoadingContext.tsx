import { createContext } from 'react';

export const LoadingContext = createContext<any>({ loading: false });

export default LoadingContext;
