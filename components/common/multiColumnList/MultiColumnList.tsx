import React from 'react';
import styles from './MultiColumnList.module.scss';

interface Props {
  ordered: boolean
  items: any[]
}

const MultiColumnList: React.FC<Props> = ({ ordered, items }) => {
  const ListComponent = ordered ? 'ol' : 'ul';
  console.log(ListComponent);

  return (
    <ul className={styles.multiColumnList}>
      {
        items.map((item, idx) => (
          <li key={idx}>
            {item}
          </li>
        ))
      }
    </ul>
  );
};

export default MultiColumnList;
