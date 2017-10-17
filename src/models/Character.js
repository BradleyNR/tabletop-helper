import PARSE_URL from '../parse.js';
// let $ = window.$ = require('jquery');
let Backbone = require('backbone');


let Character = Backbone.Model.extend({
  idAttribute: "objectId",
  defaults: {
    characterName: '',
    characterClass: '',
    owner: '',
    cards: [{}],
    imageUrl: ''
  },
  urlRoot: PARSE_URL + '/classes/CharacterSheet',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
})

let CharacterList = Backbone.Collection.extend({
  model: Character,
  url: PARSE_URL + '/classes/CharacterSheet',
  // parse is a built in method
  parse: function(data){
    return data.results;
  }
})

export {Character as default, CharacterList};
