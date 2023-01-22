import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ name, onFilterChange }) => (
  <div className={css.filterBox}>
    <label className={css.filterLabel}>
      <span className={css.filterLabelText}>Find contacts by name</span>

      <input
        className={css.filterInput}
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={onFilterChange}
      />
    </label>
  </div>
);

export default Filter;

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
