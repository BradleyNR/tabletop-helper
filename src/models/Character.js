import PARSE_URL, {HEADERS} from '../parse.js';
let $ = window.$ = require('jquery');
let Backbone = require('backbone');


let Character = Backbone.Model.extend({
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
  urlRoot: PARSE_URL + '/classes/CharacterSheets'
})

export default Character;



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
