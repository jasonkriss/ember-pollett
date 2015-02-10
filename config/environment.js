'use strict';

var GENERIC_ERROR = 'Whoops. Something went wrong.';

module.exports = function(/* environment, appConfig */) {
  return {
    'ember-pollett': {
      host: null,
      modelType: 'user',
      authenticatedRoot: null,
      flashes: {
        forgotSuccess: 'Email sent!',
        forgotFailure: GENERIC_ERROR,
        loginFailure: GENERIC_ERROR,
        registrationFailure: GENERIC_ERROR,
        resetSuccess: 'Password updated!',
        resetFailure: GENERIC_ERROR
      }
    }
  };
};
