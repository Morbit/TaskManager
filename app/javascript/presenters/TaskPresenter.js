import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

export default new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    asignee: PropTypes.string,
    state: PropTypes.string,
    transitions: PropTypes.string,
  },
  {},
);
