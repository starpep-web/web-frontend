import React, { Fragment, useState } from 'react';
import { Button, Card, Content, Modal } from 'react-bulma-components';
import { TeamMember } from '@lib/data/contact';
import styles from './MemberCard.module.scss';

interface Props extends TeamMember {
  className?: string
}

const MemberCard: React.FC<Props> = ({
  className,
  name,
  email,
  shortCv,
  avatarUrl,
  website,
  phone,
  occupation,
  affiliations,
  location
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Fragment>
      <Card className={`${styles['member-card']} ${className ? className : ''}`}>
        <Card.Image src={avatarUrl} alt="member-avatar" rounded />
        <Card.Content className={styles['card-content']}>
          <h2>
            {name}
          </h2>

          {
            occupation && (
              <p>
                {occupation}
              </p>
            )
          }

          {
            affiliations.length > 0 && (
              affiliations.map((affiliation, idx) => (
                <p key={idx}>
                  {affiliation}
                </p>
              ))
            )
          }

          <p>
            {location}
          </p>

          <a href={`mailto:${email}`}>
            {email}
          </a>
          {
            phone && (
              <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
            )
          }
          {
            website && (
              <p><a href={website} target="_blank" rel="noreferrer">{website}</a></p>
            )
          }
        </Card.Content>
        <Card.Footer>
          <Card.Footer.Item>
            <Button color="primary" onClick={handleClick}>Short CV</Button>
          </Card.Footer.Item>
        </Card.Footer>
      </Card>

      <Modal show={isOpen} onClose={() => setIsOpen(false)} className={styles.modal}>
        <Modal.Card>
          <Modal.Card.Header showClose={false} textWeight="bold" backgroundColor="primary" />
          <Modal.Card.Body>
            <Content>
              {
                shortCv.length > 0 && (
                  shortCv.map((shortCv, idx) => (
                    <p key={idx}>
                      {shortCv}
                    </p>
                  ))
                )
              }
            </Content>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </Fragment>
  );
};

export default MemberCard;
