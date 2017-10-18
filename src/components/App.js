import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import '../styles/App.css';

import Accounts from './Accounts';
import CharacterSheet from './CharacterSheet';
import GamePage from './GamePage';

class App extends Component {

  render() {
    return (
    <Router>
     <Switch>
       <main>
         <Route path='/' exact component={Accounts} />
         <Route path='/sheets' exact component={CharacterSheet} />
         <Route path='/game' exact component={GamePage} />
         {/* <Redirect to="/" /> */}
       </main>
     </Switch>
   </Router>
    );
  }
}

export default App;
