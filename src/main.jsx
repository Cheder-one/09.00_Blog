import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import './styles/index.scss';

createRoot(document.getElementById('root')).render(
  // <Provider>
  <Router>
    <App />
  </Router>
  // </Provider>
);
