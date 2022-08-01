import React from 'react';
import PropTypes from 'prop-types';

import { useForm } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';

const ADD_ITEM = gql`
mutation addItemToGroup($name: String!, $templateGroupId: String!) {
  addItemToGroup (
    templateGroupId: $templateGroupId,
    item: $name
  ) {
    name,
    lang,
    items,
    _id
  }
}`;

function AddItemToGroupForm( { onDataSubmitted, groupId } ) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const [addItemMutation, { loading, error }] = useMutation(ADD_ITEM);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Enter an unique name</p>;
  }

  const onSubmit = (formData) => {
    addItemMutation( {
      variables: {
        name: formData.itemName,
        templateGroupId: groupId,
      },
      onCompleted: (data) => {
        onDataSubmitted( data.addItemToGroup._id );
      }
    })
  }
  //console.log(watch("templateName")); // watch input value by passing the name of it

  return (
    <div>
      Add item
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("itemName", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.itemName && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  )
}

AddItemToGroupForm.propTypes = {
  onDataSubmitted: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
}

export default AddItemToGroupForm;