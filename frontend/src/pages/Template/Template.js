import { useParams } from "react-router-dom";
import Template from "../../components/Template/Template";

function TemplatePage() {
  const params = useParams();

  return (
    <Template templateId={ params.templateId }/>
  );
}

export default TemplatePage;