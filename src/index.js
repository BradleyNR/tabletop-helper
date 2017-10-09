import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import BaseLayout from './layouts/BaseLayout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BaseLayout />, document.getElementById('root'));
registerServiceWorker();
