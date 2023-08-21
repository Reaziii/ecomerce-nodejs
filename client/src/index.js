import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import store from './redux/store'
import routes from './routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const createStore = store();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={createStore.store}>
      <PersistGate loading={null} persistor={createStore.persistor}>
        <App>
          <RouterProvider router={routes} />
        </App>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
