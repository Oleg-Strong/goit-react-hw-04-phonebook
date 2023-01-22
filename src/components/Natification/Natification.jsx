import css from './Natification.module.css';
import PropTypes from 'prop-types';

const Natification = ({ title }) => {
  return title ? (
    <h2 className={css.natificationTitle}>
      Contact with the name
      <span className={css.natificationTitleTexst}> "{title}" </span>not found.
    </h2>
  ) : (
    <h2 className={css.natificationTitle}>
      There are no contacts in the phone book yet!
    </h2>
  );
};
export default Natification;

Natification.prototype = {
  title: PropTypes.string.isRequired,
};
