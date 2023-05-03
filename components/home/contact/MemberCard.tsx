import React, { Fragment, ReactNode, useState } from 'react';
import { Button, Card, Content, Modal } from 'react-bulma-components';
import styles from './MemberCard.module.scss';

interface Props {
  className?: string
  name: string
  occupation?: ReactNode
  email: string
  shortCV: string
  avatar: string
  website?: string
  phone?: string
}

const MemberCard: React.FC<Props> = ({ email, shortCV, occupation, name, avatar, className, website, phone }) => {
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
          {occupation}
          <a href={`mailto:${email}`}>{email}</a>
          {phone && (
            <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
          )}
          {website && (
            <p><a href={website} target="_blank" rel="noreferrer">{website}</a></p>
          )}
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <Button color="primary" onClick={handleClick}>Short CV</Button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Card>
          <Modal.Card.Header showClose={false} textWeight="bold" backgroundColor="primary" />
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
