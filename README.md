# ember-pollett

Ember companion to the [Pollett](https://github.com/jasonkriss/pollett) ruby gem.

## Installation

```bash
# From within your ember-cli project
ember install:addon ember-pollett
```

## Usage

This addon is meant to be used with the Pollet ruby gem. It can likely be configured to work with other backends, but the convenience factor will be significantly reduced.

Within your Ember app, you will need to do two things. First, you need to set a few configuration options in your application's `config/environment.js` file:

```javascript
ENV['ember-pollett'] = {
  host: 'https://api.example.com',
  authenticatedRoot: 'items'
};
```

The second required step is to mount the engine in your application's `app/router.js` file::

```javascript
import Em from 'ember';
import config from './config/environment';
import { mount as mountAuth } from 'ember-pollett';

var Router = Em.Router.extend({
  location: config.locationType
});

Router.map(function() {
  mountAuth(this, function() {
    this.resource('someResourceRequiringAuth');
    this.resource('anotherResourceRequiringAuth');
  });
});

export default Router;
```

Once these two steps are done, your app will be rewarded with the following:

* all the auth routes your app needs (login, forgotten password, etc)
* a `session` object available on all routes, controllers, and components (`session.user` will give you the authenticated user)
* much, much more

In addition, if your app has installed [ember-flash-message](https://github.com/jasonkriss/ember-flash-message), ember-pollett will add flash messages on certain events. These flash messages can be configured by overriding the defaults [here](/config/environment.js).


