import React from 'react';
import styles from './MultiColumnList.module.scss';

interface Props {
  ordered: boolean
  items: unknown[]
  itemComponent?: React.JSXElementConstructor<{ children: unknown }>
}

export const MultiColumnList: React.FC<Props> = ({ ordered, items, itemComponent }) => {
  const ListComponent = ordered ? 'ol' : 'ul';
  const ItemComponent = itemComponent ?? (({ children }) => <span>{children}</span>);

  return (
    <ListComponent className={styles.multiColumnList}>
      {
        items.map((item, idx) => (
          <li key={idx}>
            <ItemComponent>
              {item}
            </ItemComponent>
          </li>
        ))
      }
    </ListComponent>
  );
};
