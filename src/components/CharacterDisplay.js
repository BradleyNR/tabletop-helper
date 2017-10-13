import React, { Component } from 'react';

import Character, {CharacterList} from '../models/Character';

class CharacterDisplay extends Component {
  constructor(props){
    super(props);

    this.state = {
      characterList: new CharacterList()
    }
  }

  componentDidMount(){
    let characterList = this.state.characterList;
    characterList.fetch().then(() => {
      this.setState({characterList: characterList});
      console.log(this.state.characterList.models);
    })
  }

  render(){

    let options = this.state.characterList.models.map((item, index) => {
      let fields = item.attributes;
      return(
        <option value={fields.characterName}>{fields.characterName}</option>
      )
    });

    return(
      <div>
        <h1>Character</h1>
        <select onChange={this.handleCharacterChange}>
          {options}
        </select>
      </div>
    )
  }
}

export default CharacterDisplay;
