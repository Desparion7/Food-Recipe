/* eslint-disable react/no-array-index-key */
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import styles from './FoodForm.module.css';

interface FormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}
interface ErrorFormValues {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices?: string;
  diameter?: string;
  spiciness_scale?: string;
  slices_of_bread?: string;
}

const FoodForm = () => {
  const initialValues: FormValues = {
    name: '',
    preparation_time: '',
    type: '',
    no_of_slices: 1,
    diameter: 30,
    spiciness_scale: 1,
    slices_of_bread: 1,
  };
  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    console.log(values);
    actions.setSubmitting(false);
  };
  const validateForm = (values: FormValues) => {
    const errors: Partial<ErrorFormValues> = {};

    if (!values.name) {
      errors.name = 'Field required';
    }

    if (!values.preparation_time) {
      errors.preparation_time = 'Field required';
    }

    if (!values.type) {
      errors.type = 'Field required';
    }

    if (values.type === 'pizza') {
      if (!values.no_of_slices) {
        errors.no_of_slices = 'Field required';
      }

      if (!values.diameter) {
        errors.diameter = 'Field required';
      }
    } else if (values.type === 'soup') {
      if (!values.spiciness_scale) {
        errors.spiciness_scale = 'Field required';
      }
    } else if (values.type === 'sandwich') {
      if (!values.slices_of_bread) {
        errors.slices_of_bread = 'Field required';
      }
    }

    return errors;
  };
  return (
    <Formik<FormValues>
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form className={styles.form}>
          <h2>Recipe</h2>
          <div className={styles.form_fieldsBox}>
            <label htmlFor="name">Dish name:</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage
              className={styles.errorText}
              name="name"
              component="div"
            />
          </div>
          <div className={styles.form_fieldsBox}>
            <label htmlFor="preparation_time">Preparation time:</label>
            <Field
              type="time"
              step="1"
              id="preparation_time"
              name="preparation_time"
            />
            <ErrorMessage
              className={styles.errorText}
              name="preparation_time"
              component="div"
            />
          </div>
          <div className={styles.form_fieldsBox}>
            <label htmlFor="type">Dish type:</label>
            <Field as="select" id="type" name="type">
              <option value="" disabled>
                Select
              </option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="sandwich">Sandwich</option>
            </Field>
            <ErrorMessage
              className={styles.errorText}
              name="type"
              component="div"
            />
          </div>

          {values.type === 'pizza' && (
            <>
              <div className={styles.form_fieldsBox2}>
                <label htmlFor="no_of_slices">Number of slices:</label>
                <Field
                  type="number"
                  id="no_of_slices"
                  name="no_of_slices"
                  max="100"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="no_of_slices"
                  component="div"
                />
              </div>
              <div className={styles.form_fieldsBox2}>
                <label htmlFor="diameter">Diameter in cm :</label>
                <Field
                  type="number"
                  step="0.01"
                  id="diameter"
                  name="diameter"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="diameter"
                  component="div"
                />
              </div>
            </>
          )}

          {values.type === 'soup' && (
            <div className={styles.form_fieldsBox2}>
              <label htmlFor="spiciness_scale">Spiciness scale (1-10):</label>
              <select id="spiciness_scale" name="spiciness_scale">
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <ErrorMessage
                className={styles.errorText}
                name="spiciness_scale"
                component="div"
              />
            </div>
          )}

          {values.type === 'sandwich' && (
            <div className={styles.form_fieldsBox2}>
              <label htmlFor="slices_of_bread">Slices of bread:</label>
              <Field
                type="number"
                id="slices_of_bread"
                name="slices_of_bread"
              />
              <ErrorMessage
                className={styles.errorText}
                name="slices_of_bread"
                component="div"
              />
            </div>
          )}

          <button type="submit">Add recpie</button>
        </Form>
      )}
    </Formik>
  );
};

export default FoodForm;
