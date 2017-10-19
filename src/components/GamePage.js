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
      gameVisible: false
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
      this.setState({game: new Game(), title: '', description: '', gameVisible: false})
      // TODO: Show list of games you own

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
    console.log('This will delete eventually');
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
    this.setState({game: this.state.selectedGame, title: title, description: description, gameVisible: gameVisible})
  }

  newGame = (e) => {
    e.preventDefault();
    this.setState({game: new Game(), selectedGame: new Game(), title: '', description: '', gameVisible: false});
  }

  render(){

    // populate the dropdown with games
    let options = this.state.gameList.models.map((item, index) => {
      let fields = item.attributes;
      return(
        <option key={index} value={fields.title}>{fields.title}</option>
      )
    });

    return(
      <div className='ten columns offset-by-one'>
        <h2>Create a new gameplay session!</h2>

        <div className='row'>
          <label htmlFor='game-select'>Game Select:</label>
          <select onChange={this.handleGameChange} id='game-select' className='four columns'>
            {options}
          </select>
          <button onClick={this.editSelected} className='three columns'>Edit Selected</button>
          <button onClick={this.newGame} className='three columns'>New Game</button>
        </div>

        <form className='twelve columns' onSubmit={this.handleGameCreate}>
          <label htmlFor='game-title'>Game Title:</label>
          <input onChange={this.handleTitle} type='text' className='twelve columns' id='game-title' value={this.state.title}></input>
          <label htmlFor='game-description'>Game Description:</label>
          <textarea onChange={this.handleDescription} className='twelve columns' id='game-description' value={this.state.description}></textarea>

          <label>
            <p>Visible to other players?</p>
            <input onChange={this.handleRadio} name='active-game' type="radio" value={true} checked={this.state.gameVisible}/>
            <span className="label-body">Yes</span>
            <input onChange={this.handleRadio} name='active-game' type="radio" value={false} checked={!this.state.gameVisible}/>
            <span className="label-body">No</span>
          </label>

          <button onClick={this.handleDelete} className='delete-button'>Delete Game</button>

          <div className='row'>
            <input className='button button-primary' type='submit' value='Create Game'></input>
          </div>
        </form>

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
    )
  }
}

export default GamePage;
