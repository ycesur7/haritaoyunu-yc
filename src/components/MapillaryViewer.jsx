import { useEffect, useRef } from 'react';
import { Viewer } from 'mapillary-js';

export default function MapillaryViewer({ imageId, onError }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!imageId || !containerRef.current) return;

    try {
      if (viewerRef.current) {
        viewerRef.current.remove();
      }

      const viewer = new Viewer({
        container: containerRef.current,
        accessToken: import.meta.env.VITE_MAPILLARY_TOKEN,
        imageId: imageId,
      });

      viewerRef.current = viewer;
    } catch (error) {
      console.error('Mapillary Viewer hatası:', error);
      onError?.();
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.remove();
      }
    };
  }, [imageId, onError]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '600px' }}
    />
  );
}
