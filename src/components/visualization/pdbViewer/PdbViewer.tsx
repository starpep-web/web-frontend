/* eslint-disable no-underscore-dangle */
'use client';
import React, { useRef, useEffect, useState, forwardRef, useCallback } from 'react';
import clsx from 'clsx';
import type { GLViewer } from '3dmol';
import { Loader } from '@components/common/loader';
import { AtomStyle, ColorScheme } from './types';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;
const DEFAULT_STYLE: AtomStyle = 'cartoon';
const DEFAULT_COLOR: ColorScheme = 'ssJmol';
const DEFAULT_DISABLE_MOUSE = false;

interface Props {
  children?: React.ReactNode
  className?: string

  pdb: string

  width?: number | string
  height?: number | string

  style?: AtomStyle
  color?: ColorScheme
  spin?: boolean
  disableMouse?: boolean

  onReady?: (viewer: GLViewer) => void
}

const createStyle = (style: AtomStyle, color: ColorScheme) => {
  return { [style]: { colorscheme: color } };
};

export const PdbViewer = forwardRef<HTMLDivElement, Props>(({
  children,
  className,
  pdb,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  style = DEFAULT_STYLE,
  color = DEFAULT_COLOR,
  spin,
  disableMouse = DEFAULT_DISABLE_MOUSE,
  onReady
}, forwardedRef) => {
  const viewerRef = useRef<GLViewer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initializeCanvasEvents = useCallback((viewer: GLViewer, disableMouse: boolean) => {
    const canvas = viewer.getCanvas();

    canvas.onmousedown = disableMouse ? null : (e) => viewer._handleMouseDown(e);
    canvas.ontouchstart = disableMouse ? null : (e) => viewer._handleMouseDown(e);
    canvas.onwheel = disableMouse ? null : (e) => viewer._handleMouseScroll(e);
    canvas.onmousemove = disableMouse ? null : (e) => viewer._handleMouseMove(e);
    canvas.ontouchmove = disableMouse ? null : (e) => viewer._handleMouseMove(e);
  }, []);

  useEffect(() => {
    setLoading(true);

    const load = async () => {
      // This import injects an object to the window object. We need to import this inside an effect.
      const { createViewer } = await import('3dmol');

      if (viewerRef.current) {
        return;
      }

      viewerRef.current = createViewer(containerRef.current!, { nomouse: true });
      viewerRef.current!.addModel(pdb, 'pdb');
      viewerRef.current!.setStyle({}, createStyle(style, color));
      viewerRef.current!.render();

      initializeCanvasEvents(viewerRef.current!, disableMouse);

      onReady?.(viewerRef.current!);
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
    if (viewerRef.current) {
      viewerRef.current!.setStyle({}, createStyle(style, color));
      viewerRef.current!.render();
    }
  }, [style, color]);

  useEffect(() => {
    if (spin) {
      viewerRef.current?.spin('y', 1);
    } else {
      viewerRef.current?.spin(false);
    }
  }, [spin]);

  useEffect(() => {
    if (viewerRef.current) {
      initializeCanvasEvents(viewerRef.current!, disableMouse);
    }
  }, [disableMouse]);

  return (
    <div className={clsx('relative', className)} style={{ width, height }}>
      <div ref={forwardedRef} className="w-100 h-100">
        <div ref={containerRef} className="w-100 h-100" />
      </div>

      <Loader absoluteCenter loading={loading} />
      {
        !loading && children
      }
    </div>
  );
});
