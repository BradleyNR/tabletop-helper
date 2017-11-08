import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import Accounts from './Accounts';
import CharacterSheet from './CharacterSheet';
import GamePage from './GamePage';
import JoinGame from './JoinGame';

class App extends Component {

  render() {
    return (<Router>
      <Switch>
        <main>
          <Route path='/' exact={true} component={Accounts}/>
          <Route path='/home' exact={true} component={Home}/>
          <Route path='/sheets' exact={true} component={CharacterSheet}/>
          <Route path='/game' exact={true} component={GamePage}/>
          <Route path='/joingame' exact={true} component={JoinGame}/>
        </main>
      </Switch>
    </Router>);
  }
}

export default App;
