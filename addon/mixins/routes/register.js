import Em from 'ember';
import Sessionable from '../sessionable';

export default Em.Mixin.create(Sessionable, {
  failureFlash: 'registrationFailure',

  model: function() {
    return {
      name: null,
      email: null,
      password: null,
      method: 'register'
    };
  },

  onSuccess: function() {
    this.transitionTo('authenticated');
  }
});
