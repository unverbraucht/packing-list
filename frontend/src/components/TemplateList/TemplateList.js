import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const GET_TEMPLATES = gql`
  query {
    getAll {
      name
      _id
    }
  }`;

function TemplateList ({ lastAddedId }) {
  const { loading, error, data, refetch } = useQuery(GET_TEMPLATES);

  useEffect(() => {
    if (lastAddedId) {
      refetch();
    }
  }, [ lastAddedId, refetch ]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  const list = data.getAll.map(item => (
    <li key={ item._id }>
      <Link to={`/template/${item._id}`}>
        { item.name }
      </Link>
    </li>
  ))

  return (
    <ul>
      { list }
    </ul>
  );
}

TemplateList.propTypes = {
  "lastAddedId": PropTypes.string
}

export default TemplateList;
