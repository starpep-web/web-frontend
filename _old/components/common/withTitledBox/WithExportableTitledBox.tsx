import React, { CSSProperties, RefObject } from 'react';
import { Box, Heading, Block } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useExport } from '@components/hooks/export';
import styles from './WithTitledBox.module.scss';

interface Props {
  title: string
  exportedFilename: string
  disabled?: boolean
  children: React.ReactNode
  width?: string | number
  height?: string | number
  minWidth?: string | number
  minHeight?: string | number
  noTitleMargin?: boolean
}

const WithExportableTitledBox: React.FC<Props> = ({ title, exportedFilename, disabled, children, width, height, minWidth, minHeight, noTitleMargin }) => {
  const [ref, exportRef] = useExport<HTMLDivElement>(exportedFilename);

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
    <Box domRef={ref as unknown as RefObject<'div'>}>
      <div className={styles['exportable-heading-wrapper']}>
        <Heading className={clsx({ [styles['no-title-margin']]: noTitleMargin }, styles['exportable-heading'])}>
          {title}
        </Heading>

        {
          !disabled && (
            <FontAwesomeIcon title="Export as Image" className={styles['export-icon']} icon="up-right-from-square" onClick={exportRef} />
          )
        }
      </div>

      <Block style={outerStyle}>
        <Block style={innerStyle}>
          {children}
        </Block>
      </Block>
    </Box>
  );
};

export default WithExportableTitledBox;
