import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import createStore from './app/store/root/store.js';

const store = createStore();

if (process.env.NODE_ENV === 'production') {
  console.log = function () {};
  console.error = function () {};
}

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
