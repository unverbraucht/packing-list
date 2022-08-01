import { useState } from 'react';

import { gql, useQuery } from "@apollo/client";
import AddGroupToTemplate from "../AddTemplateGroup/AddTemplateGroup";

const GET_TEMPLATE = gql`
  query TemplateQuery ($id: String!) {
    template(id: $id) {
      name,
      groups {
        name,
        lang,
        items,
        _id
      },
      _id
    }
  }`;


function Template( { templateId } ) {
  const [showAddForm, setShowAddForm] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_TEMPLATE, {
    variables: {
      id: templateId
    }
  });

  const  onDataSubmitted = () => {
    refetch();
    setShowAddForm(false);
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error </p>;
  }
  const { template } = data;

  const templateName = template.name;
  const groupList = template.groups.map(group => {
    const itemList = group.items.map(item => (
      <li> { item } </li>
    ));
    return(
      <>
        <div key={ group._id }>
            { group.name }
            { itemList }
        </div>
      </>
    )
  })

  return (
    <div>
      <h1> { templateName } </h1>
      <div>{ groupList }</div>
      <button onClick={() => setShowAddForm(!showAddForm)}>
          { showAddForm ? "-" : "+" }
        </button>
        {
          showAddForm && (
            <AddGroupToTemplate onDataSubmitted={ onDataSubmitted } templateId={templateId} templateName={templateName} />
          )
        }
    </div>
  );
}

export default Template;