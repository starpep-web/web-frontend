import React, { CSSProperties, createRef } from 'react';
import { Box, Heading, Block } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
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
  const ref = createRef<'div'>();

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

  const handleExportClick = async () => {
    const canvas = await html2canvas(ref.current! as unknown as HTMLDivElement, {
      onclone: (_, element) => {
        element.style.boxShadow = 'none';
      }
    });

    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png', 1);
    a.download = exportedFilename;

    a.click();
    a.remove();
  };

  return (
    <Box domRef={ref}>
      <div className={styles['exportable-heading-wrapper']}>
        <Heading className={clsx({ [styles['no-title-margin']]: noTitleMargin }, styles['exportable-heading'])}>
          {title}
        </Heading>

        {
          !disabled && (
            <FontAwesomeIcon title="Export as Image" className={styles['export-icon']} icon="up-right-from-square" onClick={handleExportClick} />
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
