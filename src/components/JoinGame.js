import React, {Component} from 'react';

import Character, {CharacterList} from '../models/Character';
import Game, {GameList} from '../models/Game';


class JoinGame extends Component {
  constructor(props){
    super(props);

    this.state = {
      gameList: new GameList(),
      characterList: new CharacterList(),
      characterNameArray: [],
      gameNameArray: []
    }
  }

  componentDidMount(){
    // grabs all characters from the server and set to state
    let characterList = this.state.characterList;
    // grabbing the current objId from the logged in user
    let user = JSON.parse(localStorage.getItem('user'))
    let objId = user.objectId;
    let pointer = {
       "__type":"Pointer",
       "className":"_User",
       "objectId": objId
     };

     // grabbing character lists associated with logged in user
    characterList.fetch({data: {where: JSON.stringify({owner: pointer})}}).then((data) => {
      if (data) {
        console.log('all good');
        this.setState({characterList: characterList});
      } else {
        console.log('no data');
        this.setState({characterList: new CharacterList()})
      }

    }).then((data) => {
      console.log('Done');
      console.log(this.state.characterList.models[0].attributes.characterName);
      // creating list of titles of charactersheets
      this.state.characterList.models.map((data, index) => {
        let characterName = data.attributes.characterName;
        let characterNameArray = this.state.characterNameArray;
        characterNameArray.push(characterName);
        this.setState({characterNameArray: characterNameArray})
      });
    });

    // grab all active games and set to state
    let gameList = this.state.gameList;
     // grabbing game lists associated with logged in user
    gameList.fetch({data: {where: JSON.stringify({gameVisible: true})}}).then((data) => {
      if (data) {
        console.log('Games Acquired');
        this.setState({gameList: gameList});
        console.log(this.state.gameList.models[0].attributes.title);
      } else {
        console.log('No data received');
        this.setState({gameList: new GameList()})
      }
    }).then((data) => {
      //setting titles to state
      this.state.gameList.models.map((data, index) => {
        let gameName = data.attributes.title;
        let gameNameArray = this.state.gameNameArray;
        gameNameArray.push(gameName);
        this.setState({gameNameArray: gameNameArray})
      })
    });
  }

  handleCharacterRadio = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  handleGameRadio = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  }

  render(){

    let characterOptions = this.state.characterNameArray.map((item, index) => {
      return(
        <div>
          <span className="label-body">{item}</span>
          <input onChange={this.handleCharacterRadio} name='character-select' type="radio" value={item} />
        </div>
      )
    });

    let gameOptions = this.state.gameNameArray.map((item, index) => {
      return(
        <div>
          <span className="label-body">{item}</span>
          <input onChange={this.handleGameRadio} name='game-select' type="radio" value={item} />
        </div>
      )
    });


    return(
      <div>

        <h1>Join Game</h1>

        <div className='six columns'>
          <label>
            <p>Select A Character:</p>
            {characterOptions}
          </label>
        </div>
        <div className='five columns'>
          <label>
            <p>Select a game:</p>
            {gameOptions}
          </label>
        </div>

      </div>
    )
  }
}

export default JoinGame;
