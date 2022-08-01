import React from 'react';

import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';

const CREATE_TEMPLATE = gql`
mutation createTemplate($name: String! ) {
  createTemplate(templateData: {
    name: $name
  }) {
    _id
  }
}`;

function AddTemplate() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [createTemplate, { loading, error }] = useMutation(CREATE_TEMPLATE);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Enter an unique name</p>;
  }

  const onSubmit = (data) => {
    createTemplate( {
      variables: {
        name: data.templateName
      }
    })
  }
  //console.log(watch("templateName")); // watch input value by passing the name of it

  return (
    <div>
      Add new Template
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("templateName", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.templateName && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  )
}

export default AddTemplate;