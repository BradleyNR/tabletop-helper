import React, { Component } from 'react';

import Character, {CharacterList} from '../models/Character';
import ImageUpload from './ImageUpload';
import card from '../models/game_data/card';
import PARSE_URL, {HEADERS} from '../parse.js';

var $ = window.$ = require('jquery');


class Card extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  //update the correct field from the model on state when a field is changed
  handleDataChange = (item, idx, index, e) => {
    // console.log('item ', item);
    // console.log('e value ', e.target.value);
    // console.log('idx ', idx);
    // console.log('index ', index);
    // console.log('dataatatata ', this.props.data);
    let character = this.props.character;
    let cards = character.get('cards');
    cards[this.props.cardIndex].rows[index].inputs[item] = e.target.value;
    character.set('cards', cards);
    this.props.handleUpdate(character)
  }

  render(){

    // creating our fields
    let rowsHtml = this.props.data.map((card, index) => {

      let inputsArray = [];

      // wizard code to grab object keys and values
      for (var key in card.inputs) {
        if (card.inputs.hasOwnProperty(key)) {
          inputsArray.push(key)
        }
      }

      let inputsHtml = inputsArray.map((title, idx) => {
        return(
          <td key={idx}>
            <p>{title}</p>
            <input className='inputs' onChange={this.handleDataChange.bind(this, title, idx, index)} value={card.inputs[title]}></input>
          </td>
        )
      })

      return(
        <table className='rows'>
          <tbody>
            <tr>
              <td className=''><h4>{card.title}</h4></td>
              {inputsHtml}

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
      character: new Character({cards: card}),
      characterList: new CharacterList()
    }

  }

  componentWillMount(){
    // grabs all characters from the server and set to state
    let characterList = this.state.characterList;
    // grabbing the current objId from the logged in user
    let user = JSON.parse(localStorage.getItem('user'))
    let objId = user.objectId;
    let pointer = {
       "__type":"Pointer",
       "className":"_User",
       "objectId": objId
     };

     // grabbing character lists associated with logged in user
    characterList.fetch({data: {where: JSON.stringify({owner: pointer})}}).then((data) => {
      if (data) {
        console.log('all good');
        this.setState({characterList: characterList, character: characterList.models[0]});
      } else {
        console.log('no data');
        this.setState({character: new Character({cards: card}), characterList: new CharacterList()})
      }

    }).then((data) => {
      // set selected character equal to first returned character (also first in drop down list)
      if (data) {
        let selectedCharacter = this.state.characterList.models[0];
        this.setState({character: selectedCharacter});
      }
    });
  }

  handleNameChange = (e) => {
    let character = this.state.character;
    character.set('characterName', e.target.value);
    this.setState({character: character});
  };

  handleClassChange = (e) => {
    let character = this.state.character;
    character.set('characterClass', e.target.value);
    this.setState({character: character});
  }

  handleUpdate = (data) => {
    this.setState({character: data})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('before ', this.state.character);

    let character = this.state.character;
    let user = JSON.parse(localStorage.getItem('user'))
    let objId = user.objectId;

    //setting pointer to currently logged in user as owner
    character.set('owner', {
      "__type":"Pointer",
     "className":"_User",
     "objectId": objId
    })

    character.save().then(() => {
      let characterList = this.state.characterList;
      characterList.add(character);
      this.setState({character: character, characterList: characterList});
      console.log('uploaded!');
      // this.props.history.push('/mycharacters');
    });

    console.log('after ', this.state.character);
  }

  handleNewCharacter = (e) => {
    e.preventDefault();

    this.setState({character: new Character({cards: card})});
  }

  // TODO: MAKE SURE THAT THIS VALUE CHANGES TO A NEW CHARACTER WHEN THEY ARE ADDED
  handleCharacterChange = (e) => {
    e.preventDefault();

    // change selected character based on drop down list
    let selectedCharacter = this.state.characterList.findWhere({characterName: e.target.value});
    this.setState({character: selectedCharacter});

  }

  handleImage = (imageData) => {
    console.log(imageData);
    fetch(PARSE_URL + '/files/' + imageData.name, {
      headers: HEADERS,
      // binary data to server
      body: imageData.pic,
      method: 'POST'
    }).then((resp) => {
      return resp.json();
    }).then((message) => {
      console.log('book posted ', message);
      //take url and put on character model
      let character = this.state.character;
      character.set('imageUrl', message.url);
      this.setState({character: character});
    });
  }

  render(){
    let cardsHtml = this.state.character.attributes.cards.map((item, index) => {
      return(
        <Card key={index} title={item.title} data={item.rows} rows={item.rows.length} character={this.state.character} handleUpdate={this.handleUpdate} cardIndex={index}/>
      )
    });

    // populate the dropdown with characters
    let options = this.state.characterList.models.map((item, index) => {
      let fields = item.attributes;
      return(
        <option key={index} value={fields.characterName}>{fields.characterName}</option>
      )
    });

    return(
      <div>
        <h1>Charactersheet Creator</h1>

        <div>
          <p>Character Select:</p>
          <select onChange={this.handleCharacterChange}>
            {options}
          </select>
        </div>

        <div>
          <button onClick={this.handleNewCharacter}>New Character</button>
        </div>

          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleNameChange} placeholder='character name' value={this.state.character.get('characterName')}></input>
            <input onChange={this.handleClassChange} placeholder='character class' value={this.state.character.get('characterClass')}></input>
            {cardsHtml}
            <input type='submit'></input>
          </form>

          <ImageUpload handleImage={this.handleImage}/>

      </div>
    )
  }
}


export default CharacterSheet;
