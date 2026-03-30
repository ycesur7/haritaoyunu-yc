import { useEffect, useRef } from 'react';
import { Viewer } from 'mapillary-js';
import 'mapillary-js/dist/mapillary.css';

export default function MapillaryViewer({ imageId, accessToken, onError }) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!imageId || !containerRef.current || !accessToken) return;

    try {
      if (viewerRef.current) {
        viewerRef.current.remove();
      }

      const viewer = new Viewer({
        container: containerRef.current,
        accessToken: accessToken,
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
  }, [imageId, accessToken, onError]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ minHeight: '700px' }}
    />
  );
}
