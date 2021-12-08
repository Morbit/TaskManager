import routes from 'routes';
import FetchHelper from 'utils/fetchHelper';

export default {
  index(params) {
    const path = routes.apiV1UsersPath();
    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = routes.apiV1UserPath(id);
    return FetchHelper.get(path);
  },

  update(id, data) {
    const path = routes.apiV1UserPath(id);
    return FetchHelper.put(path, { task: data });
  },

  create(data) {
    const path = routes.apiV1UsersPath();
    return FetchHelper.post(path, { task: data });
  },

  destroy(id) {
    const path = routes.apiV1UserPath(id);
    return FetchHelper.delete(path);
  },
};
