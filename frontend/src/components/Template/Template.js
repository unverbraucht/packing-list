import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_TEMPLATES = gql`
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

function Template() {
  let params = useParams();
  return (
    <div> I am a template, { params.templateId } </div>
  );
}

export default Template;