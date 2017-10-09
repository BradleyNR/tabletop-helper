import React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import App from '../components/App';

function BaseLayout(props){
  return (
    <App />
  )
}

export default BaseLayout;
