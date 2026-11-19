import React, { useEffect, useState } from 'react';

/**
 * Opaque Server-Side Vault Endpoints
 * Original file names and /src/assets/... paths are never exposed to the client.
 */
export const KEXORA_MEDIA_VAULT = {
  LOGO: '/api/media/v_8f92a1c4',
  HERO_BG: '/api/media/v_3d74e9b2',
  RAJAN_KX: '/api/media/v_6c18f4a9',
  ADITYA_CTO: '/api/media/v_9a41d7e3',
  WEB_PORTAL_CASE: '/api/media/v_2b85c6f1',
  SHOWCASE_HERO: '/api/media/v_7e39a2d8',
  SEO_DASHBOARD: '/api/media/v_5f12b8c7',
  STUDIO_TEAM: '/api/media/v_4a90e3d1',
  LOGOS_FONT: '/api/media/v_1c67d4e5',
  SYSTEM_FONT: '/api/media/v_4e82b9d1',
  HEADING_FONT: '/api/media/v_7b93c8f2',
} as const;

// In-memory cache of raw ArrayBuffers so navigating between pages is instant
// while each <img> gets a fresh one-time blob: URL that is revoked right after render.
const memoryBufferCache = new Map<string, { buffer: ArrayBuffer; type: string }>();

interface ProtectedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const ProtectedImage: React.FC<ProtectedImageProps> = ({
  src,
  alt,
  className = '',
  ...rest
}) => {
  const [ephemeralSrc, setEphemeralSrc] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    let currentBlobUrl: string | null = null;

    const loadProtectedBlob = async () => {
      try {
        let cached = memoryBufferCache.get(src);
        if (!cached) {
          const response = await fetch(src, {
            headers: {
              'X-Kexora-Vault': '1',
            },
          });
          if (!response.ok) return;
          const contentType =
            response.headers.get('content-type') || 'image/webp';
          const arrayBuffer = await response.arrayBuffer();
          cached = { buffer: arrayBuffer, type: contentType };
          memoryBufferCache.set(src, cached);
        }

        if (!isMounted) return;
        const blob = new Blob([cached.buffer], { type: cached.type });
        currentBlobUrl = URL.createObjectURL(blob);
        setEphemeralSrc(currentBlobUrl);
      } catch {
        // Fallback to vault route if fetch fails
        if (isMounted) setEphemeralSrc(src);
      }
    };

    loadProtectedBlob();

    return () => {
      isMounted = false;
      if (currentBlobUrl && currentBlobUrl.startsWith('blob:')) {
        URL.revokeObjectURL(currentBlobUrl);
      }
    };
  }, [src]);

  const handleImageLoaded = () => {
    // Once the browser has decoded and painted the image bitmap on screen,
    // revoke the temporary blob: URL so "Open image in new tab" cannot access it.
    if (ephemeralSrc && ephemeralSrc.startsWith('blob:')) {
      const urlToRevoke = ephemeralSrc;
      window.setTimeout(() => {
        URL.revokeObjectURL(urlToRevoke);
      }, 80);
    }
  };

  if (!ephemeralSrc) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block bg-transparent ${className}`}
      />
    );
  }

  return (
    <img
      {...rest}
      src={ephemeralSrc}
      alt={alt}
      draggable={false}
      onLoad={handleImageLoaded}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      className={`select-none ${className}`}
    />
  );
};
