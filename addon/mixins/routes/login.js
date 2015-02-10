import Em from 'ember';
import Sessionable from '../sessionable';

export default Em.Mixin.create(Sessionable, {
  failureFlash: 'loginFailure',

  model: function() {
    return { email: null, password: null };
  },

  onSuccess: function() {
    var transition = this.session.get('attemptedTransition');
    this.session.set('attemptedTransition', null);
    if (transition) { transition.retry(); }
    else { this.transitionTo('authenticated'); }
  }
});
