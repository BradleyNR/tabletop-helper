import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import BaseLayout from './layouts/BaseLayout';
import registerServiceWorker from './registerServiceWorker';
import Masonry from 'masonry-layout';

import PARSE_URL from './parse.js';

ReactDOM.render(<BaseLayout/>, document.getElementById('root'));
registerServiceWorker();

//ping heroku server so login doesn't take 10 seconds to spin up
fetch(PARSE_URL + '/users', {method: 'options'});
