import Em from 'ember';

export default Em.Mixin.create({
  beforeModel: function() {
    if (this.session.get('isActive')) {
      this.transitionTo('authenticated');
    }
  }
});
