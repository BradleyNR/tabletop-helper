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
          <Route path='/' exact="exact" component={Accounts}/>
          <Route path='/home' exact="exact" component={Home}/>
          <Route path='/sheets' exact="exact" component={CharacterSheet}/>
          <Route path='/game' exact="exact" component={GamePage}/>
          <Route path='/joingame' exact="exact" component={JoinGame}/> {/* <Redirect to="/" /> */}
        </main>
      </Switch>
    </Router>);
  }
}

export default App;
