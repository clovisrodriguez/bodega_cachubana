import * as React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './routes/index';

class App extends React.Component<any, any> {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
