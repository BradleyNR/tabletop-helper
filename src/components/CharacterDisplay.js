import React, { Component } from 'react';

import Character, {CharacterList} from '../models/Character';

class CharacterDisplay extends Component {
  constructor(props){
    super(props);

    this.state = {
      characterList: new CharacterList(),
      selectedCharacter: new Character()
    }
  }

  componentDidMount(){
    // grabs all characters from the server and set to state
    let characterList = this.state.characterList;
    characterList.fetch().then(() => {
      this.setState({characterList: characterList});
    }).then(() => {
      // set selected character equal to first returned character (also first in drop down list)
      let selectedCharacter = this.state.characterList.models[0];
      this.setState({selectedCharacter: selectedCharacter});
    });
  }

  handleCharacterChange = (e) => {
    e.preventDefault();

    // change selected character based on drop down list
    let selectedCharacter = this.state.characterList.findWhere({characterName: e.target.value});
    this.setState({selectedCharacter: selectedCharacter});
    console.log('state character ', this.state.selectedCharacter.attributes);

  }

  render(){

    let options = this.state.characterList.models.map((item, index) => {
      let fields = item.attributes;
      return(
        <option key={index} value={fields.characterName}>{fields.characterName}</option>
      )
    });

    let stats = this.state.selectedCharacter.attributes;

    return(
      <div>
        <h1>Character</h1>
        <select onChange={this.handleCharacterChange}>
          {options}
        </select>
        <div>
          <h1>{stats.characterName}</h1>
        </div>
      </div>
    )
  }
}

export default CharacterDisplay;
