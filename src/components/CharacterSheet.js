import React, { Component } from 'react';
import Masonry from 'masonry-layout';

// Components
import Character, {CharacterList} from '../models/Character';
import ImageUpload from './ImageUpload';
import DiceRoller from './DiceRoller';

// Messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

// Data
import card from '../models/game_data/card';
import PARSE_URL, {HEADERS} from '../parse.js';

// jQuery
var $ = window.$ = require('jquery');





class Card extends Component {
  //update the correct field from the model on state when a field is changed
  handleDataChange = (item, idx, index, e) => {
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
            <p className='input-title'>{title}</p>
            <input className='inputs' onChange={this.handleDataChange.bind(this, title, idx, index)} value={card.inputs[title]} type='text'></input>
          </td>
        )
      })

      return(
        <table className='rows'>
          <tbody>
            <tr>
              {card.title ? <td className='row-title-box'><h4 className='row-title'>{card.title}</h4></td> : null}
              {inputsHtml}
            </tr>
          </tbody>
        </table>
      )
    });

    // return from Card component
    return (
      <div className='cards grid-item'>
      {/* // <div className='cards'> */}
        <h1 className='card-title'>{this.props.title}</h1>
        {rowsHtml}
      </div>
    )
  }
}


class CharacterSheet extends Component{
  constructor(props){
    super(props);

    this.msnry = {layout: function(){}};

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

  componentDidMount = () => {
    // Masonry Setup
    var container = document.querySelector('#grid');
    console.log(container);
    var msnry = new Masonry( container, {
      // options
      columnWidth: '.grid-item',
      itemSelector: '.grid-item',
      percentPosition: true
    });

    this.msnry = msnry;
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
      //success message popup!
      toast.success("Character sheet updated!");
    });

    console.log('after ', this.state.character);
  }

  handleNewCharacter = (e) => {
    e.preventDefault();

    this.setState({character: new Character({cards: card})});
  }

  handleDeleteCharacter = (e) => {
    e.preventDefault();

    let currentChar = this.state.character;
    let characterList = this.state.characterList;

    currentChar.destroy({success: function(model, response) {
      toast.warning("Character sheet deleted!");
      characterList.remove(currentChar);
    }});

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
    console.log('image data ', imageData);
    fetch(PARSE_URL + '/files/' + imageData.name, {
      headers: HEADERS,
      // binary data to server
      body: imageData,
      method: 'POST'
    }).then((resp) => {
      return resp.json();
    }).then((message) => {

      //take url and put on character model
      let character = this.state.character;
      character.set('imageUrl', message.url);
      this.setState({character: character});
      toast.success("Image added to character sheet. Don't forget to submit changes!");
    });
  }


  handleNav = (e) => {
    e.preventDefault();
    this.props.history.push('/home');
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
      <div className='character-sheet-background'>
        <div className='row'>
        <div className='creator twelve columns'>
          <div className='row'><button onClick={this.handleNav} className='button go-home-button two columns offset-by-five'>Home</button></div>

          <form onSubmit={this.handleSubmit}>

            <div className='row character-sheet-controls'>

              <h1 className='secondary-title'>Charactersheet Creator</h1>

              <div className='two columns header-control'>
                <label htmlFor='character-select'>Character Select:</label>
                <select onChange={this.handleCharacterChange} id='character-select'>
                  {options}
                </select>
              </div>

              <div className='three columns header-control'>
                <label htmlFor='charName'>Character Name:</label>
                <input onChange={this.handleNameChange} className='char-detail-input' id='charName' placeholder='character name' value={this.state.character.get('characterName')} type='text'></input>
              </div>
              <div className='three columns header-control'>
                <label htmlFor='charClass'>Character Class:</label>
                <input onChange={this.handleClassChange} className='char-detail-input' id='charClass' placeholder='character class' value={this.state.character.get('characterClass')} type='text'></input>
              </div>
              <div className='three columns header-control'>
                <button className='new-char-button' onClick={this.handleNewCharacter}>New Character</button>
                <input type='submit' className='button button-primary submit-changes' value='Submit Changes'></input>
                <div className='delete-container'>
                <button className='delete-button' onClick={this.handleDeleteCharacter}>Delete Character</button>
                </div>
              </div>

            </div>

            <div className='grid twelve columns' id='grid'>
              <DiceRoller msnry={this.msnry}/>
              <ImageUpload msnry={this.msnry} handleImage={this.handleImage} uploadedImage={this.state.character.get('imageUrl')}/>
              {cardsHtml}
            </div>
          </form>

        </div>
      </div>


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


export default CharacterSheet;
