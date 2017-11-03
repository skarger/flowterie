import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) { // eslint-disable-line no-unused-vars
    let user = payload.user;
    payload = {
      data: {
        id: id,
        type: 'logged-in-users',
        attributes: {
          systemId: user.system_id,
          name: user.name,
          email: user.email,
        }
      }
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
