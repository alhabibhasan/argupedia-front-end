import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ForwardButton from '../atoms/ForwardButton'
import SourceList from '../atoms/SourceList';
import ListFormInput from '../molecules/ListFormInput';

const CreateArgument = () => (
  <div>
    <h1>Let's get started!</h1>
    <Formik
      initialValues={{ title: '', argument: '', sourceList: ''}}
      validate={values => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="title">Title</label>
          <Field type="text" name="title" />
          <ErrorMessage name="title" component="div" />
          <br/>
          <label htmlFor="argument">Argument</label>
          <Field type="text" component="textarea" name="argument" style={{width: '50%'}} />
          <ErrorMessage name="argument" component="div" />
          <br/>

          <ListFormInput/>

          <ForwardButton type="submit" disabled={isSubmitting}>
          </ForwardButton>
        </Form>
      )}
    </Formik>
  </div>
);

export default CreateArgument;