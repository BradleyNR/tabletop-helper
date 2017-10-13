import PARSE_URL from '../parse.js';
// let $ = window.$ = require('jquery');
let Backbone = require('backbone');


let Character = Backbone.Model.extend({
  idAttribute: "objectId",
  defaults: {
    title: '',
    owner: '',
    characterName: '',
    characterClass: '',
    str: {},
    dex: {},
    con: {},
    int: {},
    wis: {},
    cha: {},
    EAC: {},
    KAC: {},
    combatManeuver: {},
    DR: {},
    resistance: '',
    melee: {},
    range: {},
    thrown: {},
    totalHP: {},
    currentHP: {},
    initiative: {},
    fortitude: {},
    reflex: {},
    will: {},
    acrobatics: {},
    atheletics: {},
    bluff: {},
    computers: {},
    culture: {},
    diplomacy: {},
    disguise: {},
    engineering: {},
    intimidate: {},
    lifeScience: {},
    medicine: {},
    mysticism: {},
    perception: {},
    physicalScience: {},
    profession: {},
    profession2: {},
    senseMotive: {},
    sleightOfHand: {},
    stealth: {},
    survival: {}
  },
  urlRoot: PARSE_URL + '/classes/CharacterSheets',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
})

let CharacterList = Backbone.Collection.extend({
  model: Character,
  url: PARSE_URL + '/classes/CharacterSheets',
  // parse is a built in method
  parse: function(data){
    return data.results;
  }
})

export {Character as default, CharacterList};



//
// 0spells: {},
// 1spells: {},
// 2spells: {},
// 3spells: {},
// 4spells: {},
// 5spells: {},
// 6spells: {},
// 1weapon: {},
// 2weapon: {},
// 3weapon: {},
// 4weapon: {}
