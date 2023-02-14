import React, { useEffect, useRef, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { Network, Data, Options, Node, Edge } from 'vis-network/esnext/umd/vis-network.min';
import { DataSet } from 'vis-data/esnext/umd/vis-data.min';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

interface Props {
  nodes: Node[]
  edges: Edge[]
  options?: Options

  width?: number | string
  height?: number | string
}

const Graph: React.FC<Props> = ({ nodes, edges, options, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const data: Data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    };

    const network = new Network(containerRef.current!, data, options ?? {});
    network.once('afterDrawing', () => {
      setLoading(false);
    });

    return () => {
      network.destroy();
    };
  }, []);

  return (
    <div style={{ width, height, position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <BounceLoader className="absolute-center" loading={loading} />
    </div>
  );
};

export default Graph;
