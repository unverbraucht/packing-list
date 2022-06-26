import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET_TEMPLATES = gql`
  query {
    getAll {
      name
      _id
    }
  }`;

function TemplateList() {
  const { loading, error, data } = useQuery(GET_TEMPLATES);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error </p>;
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

export default TemplateList;
