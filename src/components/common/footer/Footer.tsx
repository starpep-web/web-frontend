'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ShareButtons } from '@components/common/shareButtons';
import FullLogo from '@assets/svg/logo/full-logo.svg';
import { RouteDefs } from '@lib/constants/routes';
import { PUBLIC_URL } from '@lib/config/app';

const footerLinks = [
  { text: 'Home', href: RouteDefs.home },
  { text: 'Contact', href: RouteDefs.contact },
  { text: 'Downloads', href: RouteDefs.downloads },
  { text: 'Search', href: RouteDefs.search },
  { text: 'Statistics', href: RouteDefs.statistics },
  { text: 'About', href: RouteDefs.about }
];

export const Footer = () => {
  const [copyrightYear, setCopyrightYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setCopyrightYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-light text-center px-5 py-5">
      <Container className="pt-5 border-top">
        <Row className="pb-5">
          <Col
            className="d-flex flex-column mb-3"
            sm={{ span: 12 }}
            md={{ span: 6 }}
            lg={{ span: 4 }}
          >
            <div className="d-flex flex-column align-items-center">
              <FullLogo className="mb-2" width={300} />

              <span>Copyright © {copyrightYear}</span>
            </div>
          </Col>

          <Col
            className="mb-3"
            sm={{ span: 12 }}
            md={{ span: 6 }}
            lg={{ span: 6, offset: 2 }}
            xl={{ span: 4, offset: 4 }}
          >
            <Row>
              {
                footerLinks.map(({ text, href }, idx) => (
                  <Col
                    key={idx}
                    sm={{ span: 4 }}
                    lg={{ span: 3 }}
                  >
                    <Link href={href} className="text-black link-primary text-decoration-none">
                      {text}
                    </Link>
                  </Col>
                ))
              }
            </Row>
          </Col>
        </Row>

        <ShareButtons
          className="justify-content-center justify-content-md-end"
          withText={false}
          withCopyToClipboard={false}
          withStyle={false}
        />
      </Container>
    </footer>
  );
};
