var $ = window.$ = require('jquery');
var Backbone = require('backbone');


// SETTING HEADERS
$.ajaxSetup({
  beforeSend: function(xhr){
    xhr.setRequestHeader('X-Parse-Application-Id', 'carson');
    xhr.setRequestHeader('X-Parse-REST-API-Key', 'naturarogue')
  }
});

var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://naturals-test-parse-server.herokuapp.com/users'
}, {
  // creating a save function for parse server as to not attempt to overwrite
  // the createdAt or updatedAt fields
  save: function(key, val, options){
    delete  this.attributes.createdAt;
    delete  this.attributes.updatedAt;
    // Still apply save method
    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  // sign user up, then set the localStorage with the user
  signup: function(credentials){
    console.log('signup firing');
    let newUser = new User(credentials);
    return newUser.save().then(() => {
      User.localStore(newUser);
    })
  },
  // store user in local storage
  localStore: function(user){
    localStorage.setItem('user', JSON.stringify(user));
  },
  // log user up, then set localStorage with the logged in user for use later
  login: function(credentials){
    let loginUrl = 'https://naturals-test-parse-server.herokuapp.com/login?';
    let cred = $.param(credentials);

    let userUrl = loginUrl + cred;

    return $.get(userUrl).then((data) => {
      let newUser = new User(data);
      console.log(data);
      User.localStore(data);
    })
  }
});

export default User;
