import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['flow-structure-entry'],
    value: '',

    init() {
        this._super(...arguments);
        this.get('format')('').then((results) => this.set('results', results));
    },

    actions: {
        handleStructureEntry() {
            let inputValue = this.get('value');
            let format = this.get('format');
            format(inputValue).then((formatResults) => this.set('results', formatResults));
        }
    }
});
