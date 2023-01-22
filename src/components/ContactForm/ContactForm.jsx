import css from './ContactForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import 'yup-phone';
import PropTypes from 'prop-types';

const ContactForm = ({ onSubmit }) => {
  let scima = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'name is not valid'
      )
      .required('name field is required'),
    number: yup
      .string()
      .required('number field is required')
      .phone('UA', true, 'enter the number in the format +380(**)-***-**-**'),
  });

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={scima}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <label className={css.contactFormLabel}>
          <span className={css.contactFormLabelText}>Name:</span>
          <Field
            className={css.contactFormInput}
            type="text"
            name="name"
            required
            placeholder="First and last name"
          />
          <ErrorMessage name="name">
            {errMsg => <div className={css.erorr}>{errMsg}</div>}
          </ErrorMessage>
        </label>
        <label className={css.contactFormLabel}>
          <span className={css.contactFormLabelText}>Number:</span>
          <Field
            className={css.contactFormInput}
            type="tel"
            name="number"
            required
            placeholder="Phone number"
          />
          <ErrorMessage name="number">
            {errMsg => <div className={css.erorr}>{errMsg}</div>}
          </ErrorMessage>
        </label>
        <button className={css.contactFormBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
