import React, { Component } from 'react';

let DICE_URL = 'https://rolz.org/api/?'

class DiceRoller extends Component {
  constructor(props){
    super(props);

    this.state = {
      numberOfSides: '',
      numberOfDice: '',
      result: '',
      details: ''
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

    let Url = DICE_URL + this.state.numberOfDice + 'd' + this.state.numberOfSides + '.json'

    fetch(Url)
      .then((response) => {
        response.json()
      }).then((data) => {
        console.log('data', data);
        this.setState({result: data.result, details: data.details})
      });
  }

  render(){
    return(
      <div>
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
          <p></p>
          <p></p>
        </div>

      </div>
    )
  }
}

export default DiceRoller;
