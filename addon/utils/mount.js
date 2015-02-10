export default function(router, authenticatedRoutes) {
  router.resource('unauthenticated', { path: '/u' }, function() {
    this.resource('register');
    this.resource('login');
    this.resource('forgot');
    this.resource('reset', { path: '/reset/:token' });
  });

  router.resource('authenticated', { path: '/' }, authenticatedRoutes);
}
