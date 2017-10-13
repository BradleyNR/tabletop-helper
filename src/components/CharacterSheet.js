import React, { Component } from 'react';

import Character, {CharacterList} from '../models/Character';

import abilityRows from '../models/game_data/abilityRows';
import armorRows from '../models/game_data/armorRows';
import attackBonusRows from '../models/game_data/attackBonusRows';
import healthRows from '../models/game_data/healthRows';
import initiativeRows from '../models/game_data/initiativeRows';
import savingThrowsRows from '../models/game_data/savingThrowsRows';
import skillRows from '../models/game_data/skillRows';
import spellsKnownRows from '../models/game_data/spellsKnownRows';
import weaponsRows from '../models/game_data/weaponsRows';



let card = [
  {
    title: 'Ability Scores',
    rows: abilityRows
  },
  {
    title: 'Armor Class',
    rows: armorRows
  },
  {
    title: 'Attack Bonuses',
    rows: attackBonusRows
  },
  {
    title: 'Health and Resolve',
    rows: healthRows
  },
  {
    title: 'Initiative',
    rows: initiativeRows
  },
  {
    title: 'Saving Throws',
    rows: savingThrowsRows
  },
  {
    title: 'Skills',
    rows: skillRows
  },
  {
    title: 'Spells',
    rows: spellsKnownRows
  },
  {
    title: 'Weapons',
    rows: weaponsRows
  }
]


//title, inputs (array)

class Card extends Component {

  handleDataChange = (item, row, e) => {
    let target = row.title
    let character = this.props.character;
    let obj = this.props.character.attributes[target];
    obj[item] = e.target.value;
    character.set(target, obj);
    this.props.handleUpdate(character);
  }

  render(){

    let rowsHtml = this.props.data.map((item, index) => {
      let row = item;

      let inputs = item.inputs.map((item) => {
        return(
          <td className=''>
            {item}
            <input className='inputs' onChange={this.handleDataChange.bind(this, item, row)} item={item}></input>
          </td>
        )
      })

      return(
        <table className='rows'>
          <tbody>
            <tr>
              <td className=''><h4>{item.title}</h4></td>
              {inputs}
            </tr>
          </tbody>
        </table>
      )

    });

    return (
      <div className='cards'>
        <h1>{this.props.title}</h1>
        {rowsHtml}
      </div>
    )
  }
}



class CharacterSheet extends Component{
  constructor(props){
    super(props);

    this.state = {
      character: new Character()
    }

  }

  handleNameChange = (e) => {
    let character = this.state.character;
    character.set('characterName', e.target.value);
    this.setState({character: character});
    console.log(this.state.character);
  };

  handleClassChange = (e) => {
    let character = this.state.character;
    character.set('characterClass', e.target.value);
    this.setState({character: character});
  }

  handleUpdate = (character) => {
    this.setState({character: character})
    console.log(this.state.character);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('before ', this.state.character);

    let character = this.state.character;
    character.save().then(() => {
      this.setState({character: character});
      console.log('uploaded!');
      this.props.history.push('/mycharacters');
    });

    console.log('after ', this.state.character);
  }

  handleCharacterChange = (e) => {
    e.preventDefault();


  }

  render(){
    let cardsHtml = card.map((item, index) => {
      return(
        <Card title={item.title} data={item.rows} rows={item.rows.length} character={this.state.character} handleUpdate={this.handleUpdate}/>
      )
    });

    return(
      <div>
        <h1>Charactersheet Creator</h1>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleNameChange} placeholder='character name'></input>
            <input onChange={this.handleClassChange} placeholder='character class'></input>
            {cardsHtml}
            <input type='submit'></input>
          </form>
      </div>
    )
  }
}


export default CharacterSheet;
