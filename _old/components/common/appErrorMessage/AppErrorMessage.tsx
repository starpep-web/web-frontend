import React from 'react';
import Link from 'next/link';
import { Box, Heading, Button, Icon, Block } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ROUTES } from '@lib/constants/routes';
import styles from './AppErrorMessage.module.scss';

interface Props {
  title: string
  message: string
  icon: IconProp
  iconColor: string
}

const AppErrorMessage: React.FC<Props> = ({ title, message, icon, iconColor }) => {
  return (
    <Box className="absolute-center">
      <Heading className={styles['error-heading']} size={1}>
        <Icon mr={4} color={iconColor} size="large">
          <FontAwesomeIcon icon={icon} />
        </Icon>

        {title}
      </Heading>

      <Block>
        {message}
      </Block>

      <Button.Group align="center">
        <Button color="primary" renderAs={Link} href={ROUTES.home}>
          <Icon align="left">
            <FontAwesomeIcon icon="home" />
          </Icon>

          <span>
            Go Home
          </span>
        </Button>
      </Button.Group>
    </Box>
  );
};

export default AppErrorMessage;
