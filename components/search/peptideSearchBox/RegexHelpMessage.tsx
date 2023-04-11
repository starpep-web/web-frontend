import React from 'react';
import { Block, Notification, Heading } from 'react-bulma-components';

interface Props {
  show?: boolean
}

const RegexHelpMessage: React.FC<Props> = ({ show = true }) => {
  if (!show) {
    return null;
  }

  return (
    <Block mt={5} mb={4}>
      <Notification color="info">
        <p>
          If you need to use character classes (such as <code>\w</code>) you need to double escape them,
          in this case you should use <code>\\w</code>.
        </p>

        <p>
          For more information, check out the <a href="https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html">Java Pattern</a> specification.
        </p>

        <hr />

        <Heading size={6}>
          Some examples that you can use:
        </Heading>

        <ul className="ul-bullets">
          <li>
            <code>^A.*</code> - Lists all peptides that begin with the <code>A</code> amino acid.
          </li>

          <li>
            <code>^[^A].*</code> - Lists all peptides that do not begin with the <code>A</code> amino acid.
          </li>

          <li>
            <code>^[A-C].*</code> - Lists all peptides that begin with the <code>A</code>, <code>B</code>, or <code>C</code> amino acids.
          </li>

          <li>
            <code>.*A$</code> - Lists all peptides that end with the <code>A</code> amino acid.
          </li>

          <li>
            <code>(?i)^a.*</code> - Lists all peptides that begin with the <code>A</code> amino acid (case-insensitive).
          </li>

          <li>
            <code>.*ABC.*</code> - Lists all peptides that contain <code>ABC</code> amino acid chain anywhere inside the sequence.
          </li>

          <li>
            <code>\\b(?!\\w*[A]\\w*)\\w.*</code> - List all peptides that do not contain the <code>A</code> amino acid anywhere.
          </li>
        </ul>
      </Notification>
    </Block>
  );
};

export default RegexHelpMessage;
