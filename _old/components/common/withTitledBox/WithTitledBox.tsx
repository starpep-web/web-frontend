import React, { CSSProperties } from 'react';
import { Box, Heading, Block } from 'react-bulma-components';
import clsx from 'clsx';
import styles from './WithTitledBox.module.scss';

interface Props {
  title: string
  children: React.ReactNode
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  noTitleMargin?: boolean
}

const WithTitledBox: React.FC<Props> = ({ title, children, width, height, minWidth, minHeight, noTitleMargin }) => {
  const outerStyle: CSSProperties = {
    width: width ?? '100%',
    height: height ?? '100%',
    overflowX: minWidth ? 'scroll' : 'hidden',
    overflowY: minHeight ? 'scroll' : 'hidden'
  };

  const innerStyle: CSSProperties = {
    minWidth: minWidth ?? '100%',
    minHeight: minHeight ?? '100%'
  };

  return (
    <Box>
      <Heading className={clsx({ [styles['no-title-margin']]: noTitleMargin })}>
        {title}
      </Heading>
      <Block style={outerStyle}>
        <Block style={innerStyle}>
          {children}
        </Block>
      </Block>
    </Box>
  );
};

export default WithTitledBox;
