import React, { Fragment, useState } from 'react';
import { Button, Card, Content, Modal } from 'react-bulma-components';
import styles from './MemberCard.module.scss';

interface Props {
  className?: string
  name: string
  occupation?: string
  email: string
  shortCV: string
  avatar: string
}

const MemberCard: React.FC<Props> = ({ email, shortCV, occupation, name, avatar, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    console.log('open');
    setIsOpen(true);
  };

  return (
    <Fragment>
      <Card className={`${styles['member-card']} ${className ? className : ''}`}>
        <Card.Image src={avatar} alt="member-avatar" rounded />
        <Card.Content className={styles['card-content']}>
          <h2>{name}</h2>
          <p>{occupation}</p>
          <a href={`mailto:${email}`}>{email}</a>
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <Button color="primary" onClick={handleClick}>Short CV</Button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Card>
          <Modal.Card.Header showClose={false} textWeight="bold">{name}</Modal.Card.Header>
          <Modal.Card.Body>
            <Content size="medium">
              <p>{shortCV}</p>
            </Content>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </Fragment>
  );
};

export default MemberCard;
