import React, { Component } from 'react';

class DiceRoller extends Component {
  constructor(props){
    super(props);

    this.state = {
      numberOfSides: '',
      numberOfDice: '',
      result: 0,
      rolls: ''
    }
  };

  handleSides = (e) => {
    e.preventDefault();
    this.setState({numberOfSides: e.target.value});
  }

  handleDice = (e) => {
    e.preventDefault();
    this.setState({numberOfDice: e.target.value});
  }

  handleSubmitDice = (e) => {
    e.preventDefault();

    let die = this.state.numberOfSides;
    let dice = this.state.numberOfDice;

    let roll = (die, dice) => {
      let roll = 0;
      let rolls = [];

      for (var loop = 0; loop < dice; loop++) {
        let rolled = Math.round(Math.random() * die) % die + 1;
        roll = roll + rolled;
        rolls.push(rolled);
      }

      this.setState({result: roll, rolls: rolls.join(' + ')});
      console.log(roll);
      console.log(rolls);
    }

    roll(die, dice);
  }

  render(){
    return(
      <div className='dice-roller'>
        <h1>Dice Roll</h1>
        <form>
          <div class="row">
            <div class="six columns">
              <label htmlFor="num-side">What sided die?</label>
              <input onChange={this.handleSides} class="u-full-width" id="num-side" />
              <label htmlFor='num-roll'>How many dice do you want to roll?</label>
              <input onChange={this.handleDice} class='u-full-width' id='num-roll' />
            </div>
          </div>
          <div className='row'>
            <button onClick={this.handleSubmitDice} className='button btn-primary'>Roll The Dice!</button>
          </div>
        </form>
        <div>
          <p>{this.state.rolls}</p>
          <p>You rolled: {this.state.result}</p>
        </div>

      </div>
    )
  }
}

export default DiceRoller;
