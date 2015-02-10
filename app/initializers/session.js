export default {
  name: 'session',
  after: 'store',

  initialize: function(container, app) {
    container.injection('service:session', 'store', 'store:main');
    container.typeInjection('route', 'session', 'service:session');
    container.typeInjection('controller', 'session', 'service:session');
    container.typeInjection('component', 'session', 'service:session');

    var session = container.lookup('service:session');

    if (session.get('isActive')) {
      app.deferReadiness();
      session.fetch().then(function() { app.advanceReadiness(); });
    }
  }
};
