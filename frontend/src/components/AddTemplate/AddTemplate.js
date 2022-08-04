import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';

import styles from './AddTemplate.module.css';

const CREATE_TEMPLATE = gql`
mutation createTemplate($name: String! ) {
  createTemplate(templateData: {
    name: $name
  }) {
    _id
  }
}`;

function AddTemplate( { onDataSubmitted } ) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [createTemplate, { loading, error }] = useMutation(CREATE_TEMPLATE);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Enter an unique name</p>;
  }

  const onSubmit = (formData) => {
    createTemplate( {
      variables: {
        name: formData.templateName
      },
      onCompleted: (data) => {
        onDataSubmitted( data.createTemplate._id );
      }
    })
  }
  //console.log(watch("templateName")); // watch input value by passing the name of it

  return (
    <div className="field">
      <form onSubmit={handleSubmit(onSubmit)} className={ styles.field }>
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("templateName", { required: true })} placeholder="Add a new template"/>
        {/* errors will return when field validation fails  */}
        {errors.templateName && <span>This field is required</span>}

        <input className={ "button small right-round responsive " + styles.custom } type="submit" value="Add" />
      </form>
    </div>
  )
}

AddTemplate.propTypes = {
  onDataSubmitted: PropTypes.func.isRequired
}

export default AddTemplate;