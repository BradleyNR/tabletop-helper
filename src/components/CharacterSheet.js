import React, { Component } from 'react';

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
  render(){

    let rowsHtml = this.props.data.map((item, index) => {

      let inputs = item.inputs.map((item) => {
        return(
          <div className='two columns'>
            <p className='four column'>{item}</p>
            <input className='six columns'></input>
          </div>
        )
      })

      return(
        <div className='row'>
          <h4 className='two columns'>{item.title}</h4>
          {inputs}
        </div>
      )

    });

    return (
      <div className='twelve columns cards'>
        <h1>{this.props.title}</h1>
        {rowsHtml}
      </div>
    )
  }
}



class CharacterSheet extends Component{
  constructor(props){
    super(props);

  }

  render(){
    let cardsHtml = card.map((item, index) => {
      return(
        <Card title={item.title} data={item.rows} rows={item.rows.length} />
      )
    });

    return(
      <div>
        <h1>Charactersheet Page</h1>
        {cardsHtml}
      </div>
    )
  }
}


export default CharacterSheet;
