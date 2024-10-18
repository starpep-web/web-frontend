'use client';
import React from 'react';
import Card from 'react-bootstrap/Card';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { TextQueryPeptideSearchBox } from './tabs/TextQueryPeptideSearchBox';
import SingleQueryPeptideSearchBox from './tabs/SingleQueryPeptideSearchBox';
// import MultiQueryPeptideSearchBox from './tabs/MultiQueryPeptideSearchBox';

export const PeptideSearchBox = () => {
  return (
    <Card>
      <Card.Body>
        <Tabs defaultActiveKey="text" id="search-box-tabs">
          <Tab eventKey="text" title="Filter">
            <Card.Body>
              <TextQueryPeptideSearchBox />
            </Card.Body>
          </Tab>

          <Tab eventKey="single" title="Single Query">
            <Card.Body>
              <SingleQueryPeptideSearchBox />
            </Card.Body>
          </Tab>

          <Tab eventKey="multi" title="Multi Query">
            <Card.Body>
              MULTI QUERY
            </Card.Body>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};
