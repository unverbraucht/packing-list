import { useParams } from "react-router-dom";

function Template() {
  let params = useParams();
  return (
   <div> I am a template, { params.templateId } </div>
  );
}

export default Template;