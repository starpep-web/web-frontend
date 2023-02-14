import React, { useEffect, useRef } from 'react';
import { Network, Data, Options } from 'vis-network/esnext/umd/vis-network.min';
import { DataSet } from 'vis-data/esnext/umd/vis-data.min';
import { Node, Edge } from './types';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

interface Props {
  nodes: Node[]
  edges: Edge[]
  options: Options

  width?: number | string
  height?: number | string
}

const Graph: React.FC<Props> = ({ nodes, edges, options, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data: Data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    };

    const network = new Network(containerRef.current!, data, options);

    return () => {
      network.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width, height }} />
  );
};

export default Graph;
