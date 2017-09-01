export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:5000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing
  //
  this.organization_id = 'a1';
  this.prefix = 'orgs/' + this.organization_id + '/content_flow';

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
  this.get(this.prefix + '/flow_templates', function() {
    return {
      data: [{
        id: 'abc123',
        type: 'flow_templates',
        template_name: 'Flow 1',
      },
      {
        id: 'def456',
        type: 'flow_templates',
        template_name: 'Flow 2',
      },
      {
        id: 'ghi789',
        type: 'flow_templates',
        template_name: 'Flow 3',
      }]
    };
  });
}
