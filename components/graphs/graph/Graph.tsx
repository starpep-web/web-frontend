import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { BounceLoader } from 'react-spinners';
import { Network, Data, Options, Node, Edge } from 'vis-network/esnext/umd/vis-network.min';
import { DataSet } from 'vis-data/esnext/umd/vis-data.min';
import clsx from 'clsx';
import { LOADER_COLOR } from '@lib/constants/styling';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

interface Props {
  children?: React.ReactNode
  className?: string

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

const Graph = forwardRef<HTMLDivElement, Props>(({
  children,
  className,
  nodes,
  edges,
  options,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  centerZoom,
  minZoom,
  maxZoom,
  onReady
}, forwardedRef) => {
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
    <div className={clsx('pos-relative', className)} style={{ width, height }}>
      <div ref={forwardedRef} className="w-100 h-100">
        <div ref={containerRef} className="w-100 h-100" />
      </div>
      <BounceLoader className="absolute-center" loading={loading} color={LOADER_COLOR} />
      {
        !loading && children
      }
    </div>
  );
});

export default Graph;
