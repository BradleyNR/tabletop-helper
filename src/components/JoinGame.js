import React, {Component} from 'react';

import Character, {CharacterList} from '../models/Character';
import Game, {GameList} from '../models/Game';

// Messages
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameList: new GameList(),
      characterList: new CharacterList(),
      characterNameArray: [],
      gameNameArray: [],
      selectedGame: '',
      selectedCharacter: ''
    }
  }

  componentDidMount() {
    // grabs all characters from the server and set to state
    let characterList = this.state.characterList;
    // grabbing the current objId from the logged in user
    let user = JSON.parse(localStorage.getItem('user'))
    let objId = user.objectId;
    let pointer = {
      "__type": "Pointer",
      "className": "_User",
      "objectId": objId
    };

    // grabbing character lists associated with logged in user
    characterList.fetch({
      data: {
        where: JSON.stringify({owner: pointer})
      }
    }).then((data) => {
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
    gameList.fetch({
      data: {
        where: JSON.stringify({gameVisible: true})
      }
    }).then((data) => {
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
    this.setState({selectedCharacter: e.target.value})
  }

  handleGameRadio = (e) => {
    this.setState({selectedGame: e.target.value})
  }

  handleNav = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
  }

  joinGame = (e) => {
    e.preventDefault();
    console.log(this.state.selectedCharacter, this.state.selectedGame);

    // grabbing model and game that match selected radio inputs
    if (this.state.selectedCharacter !== '' && this.state.selectedGame !== '') {
      let selectedCharacterModel = this.state.characterList.findWhere({characterName: this.state.selectedCharacter})
      let selectedGameModel = this.state.gameList.findWhere({title: this.state.selectedGame});

      // grabbing sheets field from selected game model
      let sheetArrayInGame = selectedGameModel.get('sheets')

      // pushing data from character sheet into game model and uploading to database
      sheetArrayInGame.push(selectedCharacterModel.attributes)
      selectedGameModel.set('sheets', sheetArrayInGame)
      selectedGameModel.save();

      // sending message
      toast.success("Game joined! Returning to home screen in 3 seconds");

      // push to home screen once submitted
      setTimeout(() => {
        this.props.history.push('/home');
      }, 3000);

    } else {
      // error messaging

      toast.error('Please select a character and a game')
    }
  }

  render() {

    let characterOptions = this.state.characterNameArray.map((item, index) => {
      return (<div className="pretty p-default p-round twelve columns input-row">
        <input onChange={this.handleCharacterRadio} type="radio" name='character-select' value={item}/>
        <div className="state">
          <label>{item}</label>
        </div>
      </div>)
    });

    let gameOptions = this.state.gameNameArray.map((item, index) => {
      return (<div className="pretty p-default p-round twelve columns input-row">
        <input onChange={this.handleGameRadio} type="radio" name='game-select' value={item}/>
        <div className="state">
          <label>{item}</label>
        </div>
      </div>)
    });

    return (<div className='join-game-main-container'>
      <div className='row'>
        <button onClick={this.handleNav} className='button go-home-button two columns offset-by-five'>Home</button>
      </div>

      <div className='join-game-section'>
        <h4 className='join-game-header'>Join A Game</h4>
        <div className='row'>

          <div className='six columns game-select'>
            <label>
              <p>Select A Character:</p>
              {characterOptions}
            </label>
          </div>

          <div className='six columns game-select'>
            <label>
              <p>Select a game:</p>
              {gameOptions}
            </label>
          </div>

        </div>

        <div className='row'>
          <button onClick={this.joinGame} className='button go-home-button two columns offset-by-five'>Join Game</button>
        </div>
      </div>

      <ToastContainer position="top-right" type="success" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick="closeOnClick" pauseOnHover="pauseOnHover"/>

    </div>)
  }
}

export default JoinGame;
