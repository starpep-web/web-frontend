import React, { useEffect, useRef } from 'react';
import { Node, Edge } from './types';
import { Network, Data, Options } from 'vis-network/esnext/umd/vis-network.min';
import { DataSet } from 'vis-data/esnext/umd/vis-data.min';

interface Props {
  nodes: Node[]
  edges: Edge[]

  width?: number | string
  height?: number | string
}

const GraphVisualization: React.FC<Props> = ({ nodes, edges, width = 600, height = 400 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: Data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    };
    const options: Options = {
      nodes: {
        shape: 'square'
      }
    };

    const network = new Network(containerRef.current!, data, options);

    return () => {
      network.destroy();
    };
  }, [nodes, edges]);

  return (
    <div ref={containerRef} style={{ width, height }} />
  );
};

export default GraphVisualization;
