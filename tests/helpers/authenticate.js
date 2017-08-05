import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('authenticate', function(app) { // eslint-disable-line no-unused-vars
  visit('/login');
  fillIn('input#organization-id', 's-MI6');
  fillIn('input#api-token', '007');
  click('button#login');
});
