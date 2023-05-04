/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import postRecipe from '../api/recipeApi';
import styles from './FoodForm.module.css';
import { FormValues, ErrorFormValues, Data } from '../interface/form-interface';
import LoadingSpinner from '../ui/LoadingSpinner';
import Confirmation from './Confirmation';

const initialValues: FormValues = {
  name: '',
  preparation_time: '00:00:00',
  type: '',
  no_of_slices: 1,
  diameter: 30,
  spiciness_scale: 1,
  slices_of_bread: 1,
};

const FoodForm = () => {
  const queryClient = useQueryClient();

  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<FormValues>({
    name: '',
    preparation_time: '',
    type: '',
  });
  const [responseError, setResponseError] = useState(false);
  const [invalidField, setInvalidField] = useState(''); // Field that has not passed validation on the backend
  const [responseErrorMessage, setResponseErrorMessage] = useState(''); // Error message for invalid field

  const { mutate, isLoading } = useMutation(postRecipe, {
    onSuccess: (data) => {
      setSuccessData(data);
      setSuccess(true);
    },
    onError: (data: Data) => {
      setResponseError(true);
      // Validation information from backend
      const fieldsToCheck = [
        'name',
        'preparation_time',
        'type',
        'no_of_slices',
        'diameter',
        'spiciness_scale',
        'slices_of_bread',
      ];
      fieldsToCheck.forEach((field) => {
        if (data?.response?.data[field]) {
          setInvalidField(field);
          setResponseErrorMessage(data.response.data[field] as string);
        }
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    },
  });

  // Function to submit form
  const onSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (values.type === 'pizza') {
      mutate({
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        no_of_slices: values.no_of_slices,
        diameter: values.diameter,
      });
    } else if (values.type === 'soup') {
      mutate({
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        spiciness_scale: values.spiciness_scale,
      });
    } else {
      mutate({
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        slices_of_bread: values.slices_of_bread,
      });
    }
    actions.setSubmitting(false);
  };
  // Function to validate form
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
  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (success) {
    content = <Confirmation data={successData} setSuccess={setSuccess} />;
  } else {
    content = (
      <Formik<FormValues>
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
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
                min="00:00:00"
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
                <option value="pizza">pizza</option>
                <option value="soup">soup</option>
                <option value="sandwich">sandwich</option>
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
                  <Field type="number" id="no_of_slices" name="no_of_slices" />
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
            <button type="submit">Add recipe</button>
            {responseError && (
              <div className={styles.errorMessage}>
                Something go wrong!{' '}
                {invalidField &&
                  `Invalid field ${invalidField.replace(/_/g, ' ')}, `}
                {responseErrorMessage}.
              </div>
            )}
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <div className={styles.form}>
      <h2>Recipe</h2>
      {content}
    </div>
  );
};

export default FoodForm;
