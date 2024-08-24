'use client';
import React, { useMemo, useState } from 'react';
import clsx from 'clsx';
import { Network, Node, Edge, Options, Color } from 'vis-network/esnext/umd/vis-network.min';
import { Graph } from '@components/visualization/graph';
import { InteractivityOverlay } from '@components/visualization/overlays/interactivityOverlay';
import { FullScreenOverlay } from '@components/visualization/overlays/fullScreenOverlay';
import { ExportOverlay } from '@components/visualization/overlays/exportOverlay';
import { useExport } from '@components/hooks/useExport';
import { Peptide, PeptideMetadata } from '@lib/services/api/models/peptide';

const createNodeColor = (background: string, highlight: string, border: string): Color => {
  return {
    border,
    background,
    highlight: { border, background: highlight },
    hover: { border, background: highlight }
  };
};

const peptideNodeColor = createNodeColor('#FF595E', '#FF7075', '#FF474E');

const nodeColorsByRelationship: Record<keyof PeptideMetadata, Color> = {
  assessedAgainst: createNodeColor('#FF9A5C', '#FFA770', '#FF8E47'),
  compiledIn: createNodeColor('#FFCA3A', '#FFD35C', '#FFC933'),
  constitutedBy: createNodeColor('#C5CA30', '#D0D449', '#C1C62F'),
  isA: createNodeColor('#8AC926', '#98D831', '#82BC24'),
  linkedTo: createNodeColor('#36949D', '#3EACB6', '#349098'),
  modifiedBy: createNodeColor('#1982C4', '#1C90D9', '#1778B5'),
  producedBy: createNodeColor('#4267AC', '#4E74BC', '#3E61A3'),
  relatedTo: createNodeColor('#565AA0', '#6064A9', '#4F5292')
};

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
  },
  interaction: {
    dragView: false,
    zoomView: false
  },
  layout: {
    improvedLayout: false
  }
};

interface Props {
  peptide: Peptide

  width?: number | string
  height?: number | string
}

export const PeptideGraph: React.FC<Props> = ({ peptide, width, height }) => {
  const [network, setNetwork] = useState<Network | null>(null);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [enableInteraction, setEnableInteraction] = useState<boolean>(false);
  const [ref, exportRef] = useExport<HTMLDivElement>(`Graph-${peptide.id}`);

  if (network) {
    network.setOptions({
      interaction: {
        dragView: enableInteraction,
        zoomView: enableInteraction
      }
    });
  }

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
        if (!nodes.some((node) => node.id === metadataValue)) {
          nodes.push({
            id: metadataValue,
            label: metadataValue,
            title: metadataValue,
            color: nodeColorsByRelationship[relationship as keyof PeptideMetadata],
            group: relationship
          });
        }

        if (!edges.some((node) => node.id === `${relationship}-${metadataValue}`)) {
          edges.push({
            id: `${relationship}-${metadataValue}`,
            label: relationship,
            title: relationship,
            from: peptide.sequence,
            to: metadataValue
          });
        }
      });
    });

    return [nodes, edges];
  }, [peptide]);

  const handleReady = (network: Network) => {
    setNetwork(network);
  };

  const handleFullScreenToggle = () => {
    setFullScreen(!fullScreen);
  };

  const handleInteractionToggle = () => {
    setEnableInteraction(!enableInteraction);
  };

  return (
    <Graph
      className={clsx(fullScreen && 'full-screen')}
      nodes={nodes}
      edges={edges}
      options={options}
      width={width}
      height={height}
      centerZoom={false}
      onReady={handleReady}
      ref={ref}
    >
      <FullScreenOverlay fullScreen={fullScreen} onToggle={handleFullScreenToggle} />
      <InteractivityOverlay enabled={enableInteraction} onToggle={handleInteractionToggle} />
      <ExportOverlay onClick={exportRef} />
    </Graph>
  );
};
