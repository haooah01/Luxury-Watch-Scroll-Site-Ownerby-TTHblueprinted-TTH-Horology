"use client";

import { useEffect, useRef, type ReactNode } from "react";

type CanvasSequenceProps = {
  framePath: string;
  frameCount: number;
  children?: ReactNode;
};

export default function CanvasSequence({
  framePath,
  frameCount,
  children,
}: CanvasSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const imageCache = new Map<number, HTMLImageElement>();
    const loadingFrames = new Set<number>();
    let isActive = true;
    let currentIndex = 0;
    let animationFrame = 0;
    const cacheLimit = 18;
    const preloadRadius = 4;

    const draw = (index: number) => {
      const image = imageCache.get(index);
      if (!image || !image.complete || image.naturalWidth === 0) {
        return;
      }

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      context.fillStyle = "#000000";
      context.fillRect(0, 0, width, height);

      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const offsetX = (width - drawWidth) / 2;
      const offsetY = (height - drawHeight) / 2;
      context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
    };

    const evictDistantFrames = (centerIndex: number) => {
      for (const [index, image] of imageCache) {
        if (imageCache.size <= cacheLimit || Math.abs(index - centerIndex) <= cacheLimit / 2) {
          continue;
        }

        image.src = "";
        imageCache.delete(index);
      }
    };

    const loadFrame = (index: number) => {
      if (
        !isActive ||
        index < 0 ||
        index >= frameCount ||
        imageCache.has(index) ||
        loadingFrames.has(index)
      ) {
        return;
      }

      loadingFrames.add(index);
      const image = new Image();
      image.addEventListener(
        "load",
        () => {
          loadingFrames.delete(index);
          if (!isActive) {
            return;
          }

          imageCache.set(index, image);
          evictDistantFrames(currentIndex);
          if (index === currentIndex) {
            draw(index);
          }
        },
        { once: true },
      );
      image.addEventListener(
        "error",
        () => loadingFrames.delete(index),
        { once: true },
      );
      image.src = `${framePath}${String(index + 1).padStart(4, "0")}.webp`;
    };

    const ensureFrameWindow = (centerIndex: number) => {
      for (
        let index = centerIndex - preloadRadius;
        index <= centerIndex + preloadRadius;
        index += 1
      ) {
        loadFrame(index);
      }

      evictDistantFrames(centerIndex);
    };

    const updateFrame = () => {
      if (!isActive) {
        return;
      }

      const scrollRange = container.offsetHeight - window.innerHeight;
      const progress = Math.max(
        0,
        Math.min(1, -container.getBoundingClientRect().top / scrollRange),
      );
      const targetIndex = Math.round(progress * (frameCount - 1));

      if (targetIndex !== currentIndex) {
        currentIndex = targetIndex;
        ensureFrameWindow(currentIndex);
        draw(currentIndex);
      }

      animationFrame = window.requestAnimationFrame(updateFrame);
    };

    ensureFrameWindow(0);
    animationFrame = window.requestAnimationFrame(updateFrame);

    const resizeObserver = new ResizeObserver(() => draw(currentIndex));
    resizeObserver.observe(canvas);

    return () => {
      isActive = false;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      for (const image of imageCache.values()) {
        image.src = "";
      }
      imageCache.clear();
      loadingFrames.clear();
    };
  }, [frameCount, framePath]);

  return (
    <div ref={containerRef} className="canvas-sequence-track">
      <div className="canvas-sequence-sticky">
        <canvas ref={canvasRef} className="canvas-sequence" aria-hidden="true" />
        <div className="canvas-overlay">{children}</div>
      </div>
    </div>
  );
}
