import Em from 'ember';
import request from '../utils/request';

function failure(reason) {
  throw reason;
}

export default Em.Object.extend({
  token: null,
  user: null,
  attemptedTransition: null,
  isActive: Em.computed.bool('token'),

  config: function() {
    return this.container.lookupFactory('config:environment')['ember-pollett'];
  }.property(),

  init: function() {
    var token = localStorage.getItem('token');
    if (token) { this.setToken(token); }
  },

  start: function(params) {
    var success = this.load.bind(this);
    return this.request('POST', 'sessions', params).then(success, failure);
  },

  stop: function() {
    var success = this.clear.bind(this);
    return this.request('DELETE', 'sessions/current').then(success, failure);
  },

  fetch: function() {
    var success = this.load.bind(this);
    return this.request('GET', 'sessions/current').then(success, failure);
  },

  forgot: function(params) {
    return this.request('POST', 'sessions/forgot', params);
  },

  request: function(method, path, params) {
    return request(method, this.urlFor(path), params);
  },

  urlFor: function(path) {
    return this.get('config').host + '/' + path;
  },

  load: function(json) {
    this.loadUser(json.session.user);
    this.setToken(json.session.token);
    return this;
  },

  setToken: function(token) {
    this.set('token', token);
    localStorage.setItem('token', token);
    Em.$.ajaxSetup({ headers: { Authorization: 'Token token="%@"'.fmt(token) } });
  },

  loadUser: function(json) {
    var type = this.get('config').modelType,
        store = this.store,
        user = store.push(type, store.normalize(type, json));

    return this.set('user', user);
  },

  clear: function() {
    localStorage.clear();

    this.setProperties({
      token: null,
      user: null,
      attemptedTransition: null
    });

    return this;
  }
});
