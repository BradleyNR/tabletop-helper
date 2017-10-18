import React, { Component } from 'react';


class GamePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      description: '',
      gameVisible: false
    }
  }

  handleGameCreate = (e) => {
    e.preventDefault();


  }

  handleTitle = (e) => {
    this.setState({title: e.target.value})
  }

  handleDescription = (e) => {
    this.setState({description: e.target.value})
  }

  handleRadio = (e) => {
    //force string to boolean for state
    this.setState({gameVisible: e.target.value === 'true'})
  }


  render(){

    return(
      <div className='ten columns offset-by-one'>
        <h1>Game</h1>
        <h2>Create a new gameplay session!</h2>
        <form className='twelve columns' onSubmit={this.handleGameCreate}>
          <label htmlFor='game-title'>Game Title:</label>
          <input onChange={this.handleTitle} type='text' className='twelve columns' id='game-title'></input>
          <label htmlFor='game-description'>Game Description:</label>
          <textarea onChange={this.handleDescription} className='twelve columns' id='game-description'></textarea>

          <label>
            <p>Visible to other players?</p>
            <input onChange={this.handleRadio} name='active-game' type="radio" value={true} checked={this.state.gameVisible}/>
            <span className="label-body">Yes</span>
            <input onChange={this.handleRadio} name='active-game' type="radio" value={false} checked={!this.state.gameVisible}/>
            <span className="label-body">No</span>
          </label>

          <div className='row'>
            <input className='button button-primary' type='submit' value='Create Game'></input>
          </div>
        </form>
      </div>
    )
  }
}

export default GamePage;
