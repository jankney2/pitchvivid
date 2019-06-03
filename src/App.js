import React from 'react';
import './App.scss';
import {Provider} from 'react-redux'
import {HashRouter} from 'react-router-dom'
import store from './redux/store'
import router from './router'

// went ahead and initialized app with the provider and router -jt

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          {router}
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
