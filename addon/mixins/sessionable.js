import Em from 'ember';

export default Em.Mixin.create({
  method: 'start',
  failureFlash: null,

  flashFor: function(name) {
    var config = this.container.lookupFactory('config:environment');
    return config['ember-pollett']['flashes'][name];
  },

  tryFlash: function(name) {
    var text = this.flashFor(name),
        type = name.underscore().split('_')[1];

    if (this.flash && text) { this.flash[type](text); }
  },

  onSuccess: function(json) {
    return json;
  },

  onFailure: function(reason) {
    this.tryFlash(this.failureFlash);
  },

  actions: {
    submit: function() {
      var success = this.onSuccess.bind(this),
          failure = this.onFailure.bind(this),
          params = this.currentModel,
          method = this.method;

      this.session[method](params).then(success, failure);
    }
  }
});
