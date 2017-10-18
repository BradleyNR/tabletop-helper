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
      title: '',
      description: '',
      gameVisible: false
    }
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
    let game = this.state.game;
    //force string to boolean for state
    // TODO: THIS IS GIVING THE OPPOSITE VALUE, but only after you have changed it once
    // ex --> defaults to false, if you hit the 'yes" radio, it remains false, then if you hit 'no' it changes to true
    this.setState({gameVisible: e.target.value === 'true'});
    game.set('gameVisible', this.state.gameVisible);
    this.setState({game: game});
    console.log(this.state.gameVisible);
  }

  handleCheckState = (e) => {
    e.preventDefault();
    console.log(this.state.game);
  }

  render(){

    return(
      <div className='ten columns offset-by-one'>
        <h1>Game</h1>
        <h2>Create a new gameplay session!</h2>
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

          <button onClick={this.handleCheckState}>Check State</button>

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
