import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      flow_template: {
        template_name: "",
      },
      task_configurations: [
      ]
    }
  }
});
