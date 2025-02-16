'use client';
import React, { Fragment, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardBody from 'react-bootstrap/CardBody';
import Button from 'react-bootstrap/Button';
import ArrowDownIcon from '@assets/svg/icons/arrow-down-solid.svg';
import ArrowUpIcon from '@assets/svg/icons/arrow-up-solid.svg';

interface Props {
  children?: React.ReactNode;
}

export const SearchBoxWrapper: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const helpMessage = open ?
    'Update the filters of your search below. Click on the arrow button to collapse this menu.' :
    'Need to update your search filters? Click on the arrow button to expand the search box.';
  const IconComponent = open ? ArrowUpIcon : ArrowDownIcon;

  const handleToggle = () => {
    setOpen((value) => !value);
  };

  return (
    <Card className="mb-5">
      <CardBody>
        <div className="d-flex flex-row gap-4">
          <p className="flex-grow-1 mb-0 align-content-center">
            {helpMessage}
          </p>

          <div className="d-flex align-items-center">
            <Button variant="secondary" className="d-inline-flex" onClick={handleToggle}>
              <IconComponent className="d-inline" height={20} style={{ fill: '#fff' }} />
            </Button>
          </div>
        </div>

        {
          open && (
            <Fragment>
              <hr />

              <div>
                {children}
              </div>
            </Fragment>
          )
        }
      </CardBody>
    </Card>
  );
};
