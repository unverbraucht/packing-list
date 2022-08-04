import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';

import styles from './AddTemplateGroup.module.css';

const CREATE_GROUP = gql`
mutation addGroup($name: String!, $templateId: String!) {
  addGroup(templateId: $templateId,
  groupData: {
    name: $name,
    lang: "en"
  }) {
    _id,
  }
}`;

function AddGroupToTemplate( { templateId, templateName, onDataSubmitted } ) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Enter an unique name</p>;
  }

  const onSubmit = (formData) => {
    createGroup( {
      variables: {
        name: formData.groupName,
        templateId,
      },
      onCompleted: (data) => {
        onDataSubmitted( data.addGroup._id );
      }
    })
  }
  //console.log(watch("groupName")); // watch input value by passing the name of it

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={ styles.field }>
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("groupName", { required: true })} placeholder="Add a new category" />
        {/* errors will return when field validation fails  */}
        {errors.groupName && <span>This field is required</span>}

        <input className={ "button small right-round responsive " + styles.custom } type="submit" value="Add"/>
      </form>
    </div>
  )
}

AddGroupToTemplate.propTypes = {
  onDataSubmitted: PropTypes.func.isRequired,
  templateId: PropTypes.string.isRequired,
  templateName: PropTypes.string.isRequired,
}

export default AddGroupToTemplate;