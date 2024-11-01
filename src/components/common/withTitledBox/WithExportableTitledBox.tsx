'use client';
import React, { CSSProperties } from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import clsx from 'clsx';
import { useExport } from '@components/hooks/useExport';
import UpRightFromSquareIcon from '@assets/svg/icons/up-right-from-square-solid.svg';
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
  className?: string
}

export const WithExportableTitledBox: React.FC<Props> = ({ title, exportedFilename, disabled, children, width, height, minWidth, minHeight, noTitleMargin, className }) => {
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
    <Card ref={ref} className={className}>
      <CardBody>
        <div className="d-flex flex-row gap-2">
          <h2 className={clsx('flex-fill', noTitleMargin ? 'mb-0' : 'mb-3')}>
            {title}
          </h2>

          {
            !disabled && (
              <UpRightFromSquareIcon
                title="Export as Image"
                className={styles.exportIcon}
                onClick={exportRef}
                width={16}
                height={16}
              />
            )
          }
        </div>

        <div style={outerStyle}>
          <div style={innerStyle}>
            {children}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
