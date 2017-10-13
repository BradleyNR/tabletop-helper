import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import '../styles/App.css';

import Accounts from './Accounts';
import CharacterSheet from './CharacterSheet';
import CharacterDisplay from './CharacterDisplay';

class App extends Component {

  render() {
    return (
    <Router>
     <Switch>
       <main>
         <Route path='/' exact component={Accounts} />
         <Route path='/sheets' exact component={CharacterSheet} />
         <Route path='/mycharacters' exact component={CharacterDisplay} />
         {/* <Redirect to="/" /> */}
       </main>
     </Switch>
   </Router>
    );
  }
}

export default App;
