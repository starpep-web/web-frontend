import React, { useRef, useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { GLViewer } from '3dmol/build/types/GLViewer';
import { AtomStyle, ColorScheme } from '@components/pdb/pdbViewer/types';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;
const DEFAULT_STYLE: AtomStyle = 'stick';
const DEFAULT_COLOR: ColorScheme = 'default';

interface Props {
  children?: React.ReactNode

  pdb: string

  width?: number | string
  height?: number | string

  style?: AtomStyle
  color?: ColorScheme
  spin?: boolean

  onReady?: (viewer: GLViewer) => void
}

const createStyle = (style: AtomStyle, color: ColorScheme) => {
  return { [style]: { colorscheme: color } };
};

const PdbViewer: React.FC<Props> = ({
  children,
  pdb,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  style = DEFAULT_STYLE,
  color = DEFAULT_COLOR,
  spin,
  onReady
}) => {
  const viewerRef = useRef<GLViewer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const load = async () => {
      // This import injects an object to the window object. We need to import this inside an effect.
      const { createViewer } = await import('3dmol');

      if (viewerRef.current) {
        return;
      }

      viewerRef.current = createViewer(containerRef.current!);
      viewerRef.current.addModel(pdb, 'pdb');
      viewerRef.current.setStyle({}, createStyle(style, color));
      viewerRef.current.render();

      onReady?.(viewerRef.current);
      setLoading(false);
    };

    load();

    return () => {
      viewerRef.current?.clear();
      viewerRef.current = null;
      containerRef.current?.replaceChildren();
    };
  }, [pdb]);

  useEffect(() => {
    viewerRef.current?.setStyle({}, createStyle(style, color));
    viewerRef.current?.render();
  }, [style, color]);

  useEffect(() => {
    if (spin) {
      viewerRef.current?.spin('y', 1);
    } else {
      viewerRef.current?.spin(false);
    }
  }, [spin]);

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

export default PdbViewer;
