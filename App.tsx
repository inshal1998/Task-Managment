import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store/store';
import AppEntry from './src/AppEntry';
import {Provider} from 'react-redux';
import ThemeProvider from './src/components/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <AppEntry />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
