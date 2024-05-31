'use client';

// Redux
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalLoading from '../ui/GlobalLoading';

// This provider provides for all pages in this web app
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<GlobalLoading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default AppProvider;