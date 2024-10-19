import React from 'react';
import clsx from 'clsx';
import styles from './MultiColumnList.module.scss';

interface Props<T> {
  className?: string;
  ordered: boolean
  items: T[]
  itemComponent?: React.JSXElementConstructor<{ children: T }>
}

export const MultiColumnList = <T extends any>({ className, ordered, items, itemComponent }: Props<T>) => {
  const ListComponent = ordered ? 'ol' : 'ul';
  const ItemComponent = itemComponent ?? (({ children }) => <span>{children as React.ReactNode}</span>);

  return (
    <ListComponent className={clsx(styles.multiColumnList, className)}>
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
