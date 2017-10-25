import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import '../styles/App.css';

import Home from './Home';
import Accounts from './Accounts';
import CharacterSheet from './CharacterSheet';
import GamePage from './GamePage';
import JoinGame from './JoinGame';

class App extends Component {

  render() {
    return (
    <Router>
     <Switch>
       <main>
         <Route path='/tabletop-helper/' exact component={Accounts} />
         <Route path='/tabletop-helper/home' exact component={Home} />
         <Route path='/tabletop-helper/sheets' exact component={CharacterSheet} />
         <Route path='/tabletop-helper/game' exact component={GamePage} />
         <Route path='/tabletop-helper/joingame' exact component={JoinGame} />
         {/* <Redirect to="/" /> */}
       </main>
     </Switch>
   </Router>
    );
  }
}

export default App;
