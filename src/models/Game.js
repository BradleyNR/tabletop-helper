import PARSE_URL from '../parse.js';

let Backbone = require('backbone');

let Game = Backbone.Model.extend({
  idAttribute: "objectId",
  defaults: {
    title: '',
    description: '',
    gameVisible: false,
    owner: '',
    sheets: []
  },
  urlRoot: PARSE_URL + '/classes/Game',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
})

let GameList = Backbone.Collection.extend({
  model: Game,
  url: PARSE_URL + '/classes/Game',
  // parse is a built in method
  parse: function(data){
    return data.results;
  }
})

export {Game as default, GameList};
