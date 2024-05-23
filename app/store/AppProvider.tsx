'use client';

// Redux
import { Provider } from 'react-redux';
import store from './store'

// This provider provides for all pages in this web app
export function AppProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;