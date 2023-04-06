import React from 'react';
import { Block, Heading, Container, Notification } from 'react-bulma-components';
import clsx from 'clsx';

interface Props {
  absoluteCenter?: boolean
}

const ComingSoonPlaceholder: React.FC<Props> = ({ absoluteCenter }) => {
  return (
    <Block className={clsx({ 'absolute-center': absoluteCenter })} style={{ textAlign: 'center' }}>
      <Notification color="gray">
        <Container>
          <Heading>
            Coming Soon
          </Heading>

          <p>
            This content is currently being developed and is not ready yet.
          </p>
        </Container>
      </Notification>
    </Block>
  );
};

export default ComingSoonPlaceholder;
