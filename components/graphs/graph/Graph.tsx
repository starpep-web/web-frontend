import React, { useEffect, useRef, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { Network, Data, Options, Node, Edge } from 'vis-network/esnext/umd/vis-network.min';
import { DataSet } from 'vis-data/esnext/umd/vis-data.min';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

interface Props {
  children?: React.ReactNode

  nodes: Node[]
  edges: Edge[]
  options?: Options

  width?: number | string
  height?: number | string

  centerZoom?: boolean
  minZoom?: number
  maxZoom?: number

  onReady?: (network: Network) => void
}

const Graph: React.FC<Props> = ({
  children,
  nodes,
  edges,
  options,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  centerZoom,
  minZoom,
  maxZoom,
  onReady
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const data: Data = {
      nodes: new DataSet(nodes),
      edges: new DataSet(edges)
    };

    const network = new Network(containerRef.current!, data, options ?? {});
    if (!options?.physics?.enabled) {
      network.stabilize();
    }

    network.once('afterDrawing', () => {
      setLoading(false);
      onReady?.(network);
    });

    network.on('zoom', () => {
      const scale = network.getScale();

      if (centerZoom) {
        network.moveTo({
          position: { x: 0, y: 0 }
        });
      }

      if (minZoom && scale < minZoom) {
        network.moveTo({
          scale: minZoom
        });
      } else if (maxZoom && scale > maxZoom) {
        network.moveTo({
          scale: maxZoom
        });
      }
    });

    return () => {
      network.destroy();
    };
  }, [nodes, edges, options]);

  return (
    <div className="pos-relative" style={{ width, height }}>
      <div ref={containerRef} className="w-100 h-100" />
      <BounceLoader className="absolute-center" loading={loading} />
      {
        !loading && children
      }
    </div>
  );
};

export default Graph;
