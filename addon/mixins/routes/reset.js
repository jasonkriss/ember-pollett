import Em from 'ember';
import Sessionable from '../sessionable';

export default Em.Mixin.create(Sessionable, {
  failureFlash: 'resetFailure',

  model: function(params) {
    return {
      password: null,
      token: params.token,
      method: 'reset'
    };
  },

  onSuccess: function() {
    this.tryFlash('resetSuccess');
    this.transitionTo('authenticated');
  }
});
