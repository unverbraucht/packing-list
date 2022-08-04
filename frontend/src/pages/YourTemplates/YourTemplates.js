import React, { useState } from 'react';

import TemplateList from '../../components/TemplateList/TemplateList'
import AddTemplate from '../../components/AddTemplate/AddTemplate';

function YourTemplates() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [lastAddedId, setLastAddedId] = useState("");
  const  onDataSubmitted = createdId => {
    setLastAddedId(createdId);
    setShowAddForm(false);
  }
  return (
    <div className="App">
      <h3> Your Trips </h3>
      <TemplateList lastAddedId={ lastAddedId }></TemplateList>
      <button className="button primary round" onClick={() => setShowAddForm(!showAddForm)}>
        { showAddForm ? "-" : "+ New trip" }
      </button>
      {
        showAddForm && (
          <AddTemplate onDataSubmitted={ onDataSubmitted } />
        )
      }

    </div>
  );
}

export default YourTemplates;
