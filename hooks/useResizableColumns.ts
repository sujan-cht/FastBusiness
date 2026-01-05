// FIX: Import React to resolve namespace errors for React.MouseEvent and React.useEffect.
import { useState, useRef, useCallback, useEffect, MouseEvent } from 'react';

interface Column {
  key: string;
  label: string;
  width: number;
}

export const useResizableColumns = (initialColumns: Column[]) => {
  const [columns, setColumns] = useState(initialColumns);
  const activeResizerIndex = useRef<number | null>(null);
  const startX = useRef(0);
  const startWidths = useRef<number[]>([]);

  const onMouseDown = useCallback((index: number, e: MouseEvent) => {
    activeResizerIndex.current = index;
    startX.current = e.clientX;
    startWidths.current = columns.map(c => c.width);
    e.preventDefault();
  }, [columns]);

  const onMouseMove = useCallback((e: globalThis.MouseEvent) => {
    if (activeResizerIndex.current === null) return;
    
    const currentIndex = activeResizerIndex.current;
    const deltaX = e.clientX - startX.current;
    
    const newColumns = [...columns];
    const minWidth = 50;
    const currentWidth = startWidths.current[currentIndex];

    if (newColumns[currentIndex] && (currentWidth + deltaX) > minWidth) {
        newColumns[currentIndex] = { ...newColumns[currentIndex], width: currentWidth + deltaX };
    }
    
    setColumns(newColumns);
  }, [columns]);

  const onMouseUp = useCallback(() => {
    activeResizerIndex.current = null;
  }, []);

  useEffect(() => {
    if (activeResizerIndex.current !== null) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  const resizerProps = (index: number) => ({
    onMouseDown: (e: MouseEvent) => onMouseDown(index, e),
  });

  return { columns, resizerProps };
};