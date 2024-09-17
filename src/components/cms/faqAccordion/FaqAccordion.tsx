import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';
import { Maybe } from '@lib/utils/types';
import { Markdown } from '@components/cms/markdown';

interface Props {
  className?: string
  items?: Maybe<{
    question: string
    answer: string
  }>[]
}

export const FaqAccordion: React.FC<Props> = ({ className, items }) => {
  if (!items?.length) {
    return null;
  }

  return (
    <Accordion as="section" className={className}>
      {
        items.map((item, idx) => item && (
          <AccordionItem key={idx} eventKey={idx.toString()}>
            <AccordionHeader>
              {item.question}
            </AccordionHeader>

            <AccordionBody>
              <Markdown>
                {item.answer}
              </Markdown>
            </AccordionBody>
          </AccordionItem>
        ))
      }
    </Accordion>
  );
};
