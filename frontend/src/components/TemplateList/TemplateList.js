import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './TemplateList.css';
import cardStyle from '../Template/Template.module.css';

// icon from https://www.seekpng.com/

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
    <Link key={ item._id } to={`/template/${item._id}`} className="card">
      { item.name }
      <img width="180px" src={require('../../assets/travel.png')} alt="suitcase icon"/>
    </Link>
  ))

  return (
    <div className={cardStyle.templateCards}>
      { list }
    </div>
  );
}

TemplateList.propTypes = {
  "lastAddedId": PropTypes.string
}

export default TemplateList;
