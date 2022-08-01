import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

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


function Template( {_id} ) {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_TEMPLATE, {
    variables: {
      id: params.templateId
    }
  });
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
      <div key={ group._id }>
          { group.name }
          { itemList }
      </div>
    )
  })

  return (
    <div>
      <h1> { templateName } </h1>
      <div>{ groupList }</div>
    </div>
  );
}

export default Template;