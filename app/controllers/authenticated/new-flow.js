import Ember from 'ember';
import flowParser from '../../utils/flow-parser';
import flowGraphviz from '../../utils/flow-graphviz';

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
        },
        graphViz(text) {
            let promise = new Ember.RSVP.Promise((resolve, reject) => {
                if (typeof text == 'string') {
                    if (text.trim() === "") {
                        resolve('<div class="empty-flow-chart"></div>');
                    } else {
                        let flowStatements = flowParser(text).flow;
                        let dot = flowGraphviz(flowStatements);
                        let result = Viz(dot);
                        resolve(result);
                    }
                } else {
                    reject('given non-string value for text');
                }
            });
            return promise;
        }
    }
});
