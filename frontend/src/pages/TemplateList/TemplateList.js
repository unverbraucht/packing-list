import React, { useState } from 'react';

import './TemplateList.css';
import TemplateList from '../../components/TemplateList/TemplateList'
import AddTemplate from '../../components/AddTemplate/AddTemplate';

function TemplateListPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [lastAddedId, setLastAddedId] = useState("");
  const  onDataSubmitted = createdId => {
    setLastAddedId(createdId);
    setShowAddForm(false);
  }
  return (
    <div className="App">
      <h1> Your Templates </h1>
      <TemplateList lastAddedId={ lastAddedId }></TemplateList>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        { showAddForm ? "-" : "+" }
      </button>
      {
        showAddForm && (
          <AddTemplate onDataSubmitted={ onDataSubmitted } />
        )
      }

    </div>
  );
}

export default TemplateListPage;
