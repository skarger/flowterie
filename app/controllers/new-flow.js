import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        basicList(text) {
            let promise = new Ember.RSVP.Promise((resolve, reject) => {
                if (typeof text == 'string') {
                    if (text.trim() === "") {
                        resolve([]);
                    } else {
                        resolve(text.split('\n'));
                    }
                } else {
                    reject('given non-string value for text');
                }
            });
            return promise;
        }
    }
});
