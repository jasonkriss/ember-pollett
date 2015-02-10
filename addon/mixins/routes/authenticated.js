import Em from 'ember';

export default Em.Mixin.create({
  beforeModel: function(transition) {
    if (!this.session.get('isActive')) {
      this.session.set('attemptedTransition', transition);
      this.transitionTo('login');
    }
  },

  model: function() {
    return this.session.user;
  },

  actions: {
    logOut: function() {
      this.session.stop().then(function() {
        window.location.reload();
      });
    },

    error: function(reason) {
      if (reason.status === 401) {
        this.send('logOut');
      } else {
        return true; // Bubble up the route hierarchy
      }
    }
  }
});
