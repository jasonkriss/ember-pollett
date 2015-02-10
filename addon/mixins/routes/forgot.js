import Em from 'ember';
import Sessionable from '../sessionable';

export default Em.Mixin.create(Sessionable, {
  method: 'forgot',
  failureFlash: 'forgotFailure',

  model: function() {
    return { email: null };
  },

  onSuccess: function() {
    this.tryFlash('forgotSuccess');
    this.transitionTo('login');
  }
});
