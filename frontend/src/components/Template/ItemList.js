import { useState } from 'react';
import PropTypes from 'prop-types';

import AddItemToGroupForm from '../AddItemToGroup/AddItemToGroup';
import styles from './Template.module.css';

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

    <div key={ group._id } className={ styles.card } >
      <h6>{ group.name }</h6>
      { itemList }
      <div className={ styles.actionGroup }>
        <button className="small circle" onClick={() => setShowAddItemForm(!showAddItemForm)}>
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
    </div>
  )
}

ItemList.propTypes = {
  group: PropTypes.object.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

export default ItemList;