import React, { Fragment } from 'react';
import styles from './MultiColumnList.module.scss';

interface Props {
  ordered: boolean
  items: any[]
  itemComponent?: React.JSXElementConstructor<{ item: any }>
}

const MultiColumnList: React.FC<Props> = ({ ordered, items, itemComponent }) => {
  const ListComponent = ordered ? 'ol' : 'ul';
  const ItemComponent = itemComponent ?? Fragment;

  return (
    <ListComponent className={styles.multiColumnList}>
      {
        items.map((item, idx) => (
          <li key={idx}>
            <ItemComponent item={item} />
          </li>
        ))
      }
    </ListComponent>
  );
};

export default MultiColumnList;
