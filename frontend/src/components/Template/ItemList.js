import { useState } from 'react';
import PropTypes from 'prop-types';

import AddItemToGroupForm from '../AddItemToGroup/AddItemToGroup';

const ItemList = ({ group, onItemAdded }) => {
  const [showAddItemForm, setShowAddItemForm] = useState(false);

  const onDataSubmitted = (lastId) => {
    onItemAdded(lastId);
    setShowAddItemForm(false);
  }

  const itemList = group.items.map(item => (
    <li key={item}> { item } </li>
  ));
  return(
    <>
      <div key={ group._id }>
        { group.name }
        { itemList }
        <button onClick={() => setShowAddItemForm(!showAddItemForm)}>
          { showAddItemForm ? "-" : "+" }
        </button>
        {
          showAddItemForm && (
            <AddItemToGroupForm
              onDataSubmitted={ onDataSubmitted }
              groupId={group._id} />
          )
        }
      </div>
    </>
  )
}

ItemList.propTypes = {
  group: PropTypes.object.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

export default ItemList;