import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('authenticated', { path: '/' }, function() {
    this.route('new-flow');
    this.route('view-flows');
  });
});

export default Router;
