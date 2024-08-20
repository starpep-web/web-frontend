import React from 'react';
import { Columns, Content } from 'react-bulma-components';
import MemberCard from './MemberCard';
import { teamMembersByRole } from '@lib/data/contact';
import styles from './Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.contact} id="contact">
      <Content size="medium" textAlign="center" className={styles['header-container']}>
        <h2 className={styles.header}>Project Leaders</h2>
      </Content>

      <div className={styles.members}>
        <Columns centered className={styles['head-project-columns']}>
          {
            teamMembersByRole['Project Leaders'].map((member) => (
              <Columns.Column size="half" key={member.name}>
                <MemberCard className={styles['head-project-card']} {...member} />
              </Columns.Column>
            ))
          }
        </Columns>

        <Content size="medium" textAlign="center">
          <h3 className={styles['collaborators-header']}>Collaborators</h3>
        </Content>

        <Columns centered>
          {
            teamMembersByRole.Collaborators.map((member) => (
              <Columns.Column tablet={{ size: 'half' }} desktop={{ size: 'half' }} mobile={{ size: 12 }} widescreen={{ size: 'one-quarter' }} fullhd={{ size: 'one-quarter' }} key={member.name}>
                <MemberCard {...member} />
              </Columns.Column>
            ))
          }
        </Columns>

        <Content size="medium" textAlign="center">
          <h3 className={styles['collaborators-header']}>Developers</h3>
        </Content>

        <Columns centered>
          {
            teamMembersByRole.Developers.map((member) => (
              <Columns.Column size="one-third" key={member.name}>
                <MemberCard {...member} />
              </Columns.Column>
            ))
          }
        </Columns>
      </div>
    </div>
  );
};

export default Contact;
