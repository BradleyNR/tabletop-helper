import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import BaseLayout from './layouts/BaseLayout';
import registerServiceWorker from './registerServiceWorker';
import Masonry from 'masonry-layout';
console.log(Masonry);

ReactDOM.render(<BaseLayout />, document.getElementById('root'));
registerServiceWorker();
