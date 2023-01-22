import css from './Section.module.css';
import PropTypes from 'prop-types';
const Section = ({ title, children }) => {
  return (
    <section className={css.section}>
      <h2 className={css.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
};
export default Section;
Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
