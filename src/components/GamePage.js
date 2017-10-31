import React, { Component } from 'react';

// Messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Game, {GameList} from '../models/Game';


class GamePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      game: new Game(),
      gameList: new GameList(),
      selectedGame: new Game(),
      title: '',
      description: '',
      gameVisible: false,
      players: []
    }
  }

  componentWillMount(){
    let gameList = this.state.gameList;
    // grabbing the current objId from the logged in user
    let user = JSON.parse(localStorage.getItem('user'))
    let objId = user.objectId;
    let pointer = {
       "__type":"Pointer",
       "className":"_User",
       "objectId": objId
     };

     // grabbing game lists associated with logged in user
    gameList.fetch({data: {where: JSON.stringify({owner: pointer})}}).then((data) => {
      if (data) {
        console.log('Games Acquired');
        this.setState({gameList: gameList, selectedGame: gameList.models[0]});
        console.log('gamelist ', this.state.gameList);
      } else {
        console.log('No data received');
        this.setState({gameList: new GameList(), game: new Game()})
      }
    });
  }

  handleGameCreate = (e) => {
    e.preventDefault();

    let game = this.state.game;
    let user = JSON.parse(localStorage.getItem('user'))
    let objId = user.objectId;

    //setting pointer to currently logged in user as owner
    game.set('owner', {
      "__type":"Pointer",
     "className":"_User",
     "objectId": objId
    });

    game.set('gameVisible', this.state.gameVisible);

    console.log(this.state.game);

    game.save().then(() => {
      let gameList = this.state.gameList;
      gameList.add(game);
      this.setState({game: new Game(), title: '', description: '', gameVisible: false})

      toast.success("Game Created!");
    })

  }

  handleTitle = (e) => {
    let game = this.state.game;
    game.set('title', e.target.value)
    this.setState({title: e.target.value, game: game})
  }

  handleDescription = (e) => {
    let game = this.state.game;
    game.set('description', e.target.value)
    this.setState({description: e.target.value, game: game})
  }

  handleRadio = (e) => {
    //force string to boolean for state
    this.setState({gameVisible: e.target.value === 'true'});
  }

  handleDelete = (e) => {
    e.preventDefault();
    let game = this.state.game;
    let gameList = this.state.gameList;
    game.destroy({success: (model, response) => {
      toast.warning('Game Deleted!');
      gameList.remove(game);
      this.setState({title: '', description: '', gameVisible: false, game: new Game()})
    }})
  }

  // TODO: MAKE SURE THAT THIS VALUE CHANGES TO A NEW CHARACTER WHEN THEY ARE ADDED
  handleGameChange = (e) => {
    e.preventDefault();
    // change selected character based on drop down list
    let selectedGame = this.state.gameList.findWhere({title: e.target.value});
    this.setState({selectedGame: selectedGame});
    let title = this.state.game.get('title');
    let description = this.state.game.get('description');
    let gameVisible = this.state.game.get('gameVisible');
    this.setState({title: title, description: description, gameVisible: gameVisible})
  }

  editSelected = (e) => {
    e.preventDefault();
    let title = this.state.selectedGame.get('title');
    let description = this.state.selectedGame.get('description');
    let gameVisible = this.state.selectedGame.get('gameVisible');
    let players = this.state.selectedGame.get('sheets');
    this.setState({game: this.state.selectedGame, title: title, description: description, gameVisible: gameVisible, players: players});
  }

  newGame = (e) => {
    e.preventDefault();
    this.setState({game: new Game(), selectedGame: new Game(), title: '', description: '', gameVisible: false});
  }

  handleNav = (e) => {
    e.preventDefault();
    this.props.history.push('/tabletop-helper/home');
  }

  render(){

    // populate the dropdown with games
    let options = this.state.gameList.models.map((item, index) => {
      let fields = item.attributes;
      return(
        <option key={index} value={fields.title}>{fields.title}</option>
      )
    });

    // Iterates over stats for player characters to create cards on game
    let playerCards = this.state.players.map((item, index) => {
      return(
      <div className='five columns player-cards'>
        <p>Character Name: {item.characterName}</p>
        <p>Character Class: {item.characterClass}</p>
        <div className='row'>
          <p className='five columns game-player-stat'>{item.cards[0].rows[0].title}</p><p className='five columns'>{item.cards[0].rows[0].inputs.Score}</p>
        </div>
        <div className='row'>
          <p className='five columns game-player-stat'>{item.cards[0].rows[1].title}</p><p className='five columns'>{item.cards[0].rows[1].inputs.Score}</p>
        </div>
        <div className='row'>
          <p className='five columns game-player-stat'>{item.cards[0].rows[2].title}</p><p className='five columns'>{item.cards[0].rows[2].inputs.Score}</p>
        </div>
        <div className='row'>
          <p className='five columns game-player-stat'>{item.cards[0].rows[3].title}</p><p className='five columns'>{item.cards[0].rows[3].inputs.Score}</p>
        </div>
        <div className='row'>
          <p className='five columns game-player-stat'>{item.cards[0].rows[4].title}</p><p className='five columns'>{item.cards[0].rows[4].inputs.Score}</p>
        </div>
        <div className='row'>
          <p className='five columns game-player-stat'>{item.cards[0].rows[5].title}</p><p className='five columns'>{item.cards[0].rows[5].inputs.Score}</p>
        </div>
      </div>
    )
    })

    return(
      <div className='game-page-background'>
        <div className='ten columns offset-by-one game-page-control-area'>
          <div className='row'>

            <div className='row'><button onClick={this.handleNav} className='button go-home-button two columns offset-by-five'>Home</button></div>
            <button onClick={this.newGame} className='three columns new-char-button'>New Game</button>

          </div>

          <div className='row'>
            <label htmlFor='game-select'>Select a game to view or edit:</label>
            <select onChange={this.handleGameChange} id='game-select' className='three columns'>
              {options}
            </select>
            <button onClick={this.editSelected} className='three columns new-char-button'>View Selected</button>
            <button onClick={this.handleDelete} className='three columns offset-by-two delete-button'>Delete Game</button>
          </div>

          <form className='twelve columns' onSubmit={this.handleGameCreate}>
            <label htmlFor='game-title'>Game Title:</label>
            <input onChange={this.handleTitle} type='text' className='twelve columns' id='game-title' value={this.state.title}></input>
            <label htmlFor='game-description'>Game Description:</label>
            <textarea onChange={this.handleDescription} className='twelve columns' id='game-description' value={this.state.description}></textarea>

            <div className='visible-to-players-section'>
              <label>
                <p>Visible to other players?</p>
                <div className='row radio-button-row'>

                  <div className="pretty p-default p-round one columns input-row">
                    <input onChange={this.handleRadio} name='active-game' type="radio" value={true} checked={this.state.gameVisible}/>
                     <div className="state">
                         <label>Yes</label>
                     </div>
                  </div>

                  <div className="pretty p-default p-round one columns input-row">
                    <input onChange={this.handleRadio} name='active-game' type="radio" value={false} checked={!this.state.gameVisible}/>
                     <div className="state">
                         <label>No</label>
                     </div>
                  </div>

                </div>
              </label>
            </div>

            <div className='row'>
              <input className='button button-primary' type='submit' value='Apply Changes'></input>
            </div>
          </form>

          {playerCards}

          <ToastContainer
            position="top-right"
            type="success"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />

        </div>
      </div>
    )
  }
}

export default GamePage;
