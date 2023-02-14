import React, { useMemo } from 'react';
import { Node, Edge, Options, Color } from 'vis-network/esnext/umd/vis-network.min';
import { Graph } from '../graph';
import { FullPeptide, RelationshipLabel } from '@lib/models/peptide';

const createNodeColor = (background: string, hightlight: string, border: string): Color => {
  return {
    border,
    background,
    highlight: { border, background: hightlight },
    hover: { border, background: hightlight }
  };
};

const peptideNodeColor = createNodeColor('#FF595E', '#FF7075', '#FF474E');

const nodeColorsByRelationship: Record<RelationshipLabel, Color> = {
  assessedAgainst: createNodeColor('#FF9A5C', '#FFA770', '#FF8E47'),
  compiledIn: createNodeColor('#FFCA3A', '#FFD35C', '#FFC933'),
  constitutedBy: createNodeColor('#C5CA30', '#D0D449', '#C1C62F'),
  isA: createNodeColor('#8AC926', '#98D831', '#82BC24'),
  linkedTo: createNodeColor('#36949D', '#3EACB6', '#349098'),
  modifiedBy: createNodeColor('#1982C4', '#1C90D9', '#1778B5'),
  producedBy: createNodeColor('#4267AC', '#4E74BC', '#3E61A3'),
  relatedTo: createNodeColor('#565AA0', '#6064A9', '#4F5292')
};

interface Props {
  peptide: FullPeptide

  width?: number | string
  height?: number | string
}

const PeptideGraph: React.FC<Props> = ({ peptide, width, height }) => {
  console.log(nodeColorsByRelationship);

  const [nodes, edges] = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
      id: peptide.sequence,
      label: peptide.sequence,
      title: peptide.sequence,
      shape: 'square',
      color: peptideNodeColor,
      fixed: {
        x: true,
        y: true
      },
      x: 0,
      y: 0
    });

    Object.entries(peptide.metadata).forEach(([relationship, metadataValues]) => {
      metadataValues.forEach((metadataValue) => {
        nodes.push({
          id: metadataValue,
          label: metadataValue,
          title: metadataValue,
          color: nodeColorsByRelationship[relationship as RelationshipLabel],
          group: relationship
        });

        edges.push({
          id: `${relationship}-${metadataValue}`,
          label: relationship,
          title: relationship,
          from: peptide.sequence,
          to: metadataValue
        });
      });
    });

    return [nodes, edges];
  }, [peptide]);

  const options: Options = {
    nodes: {
      shape: 'circle',
      widthConstraint: 50,
      scaling: {
        label: {
          enabled: true
        }
      }
    },
    edges: {
      arrows: {
        to: {
          enabled: true
        }
      },
      color: '#000'
    },
    physics: {
      enabled: false,
      solver: 'repulsion',
      repulsion: {
        nodeDistance: 250
      }
    }
  };

  return (
    <Graph nodes={nodes} edges={edges} options={options} width={width} height={height} />
  );
};

export default PeptideGraph;