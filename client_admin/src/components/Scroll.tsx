"use client";
import React, { useRef, useState, useEffect } from "react";

type ScrollableBlockProps = {
  children: React.ReactNode;
};

const ScrollableBlock = ({ children }: ScrollableBlockProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startX, setStartX] = useState(0);
  const blockRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(event.clientX);
    setScrollLeft(blockRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isDragging) return;
    const x = event.clientX;
    const dragDistance = (x - startX) * 1.5; // Adjust the drag speed if necessary
    if (blockRef.current) {
      blockRef.current.scrollLeft = scrollLeft - dragDistance;
    }
  };

  useEffect(() => {
    if (isDragging) {
      const handleMouseOut = () => {
        setIsDragging(false);
      };
      window.addEventListener("mouseout", handleMouseOut);
      return () => {
        window.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [isDragging]);

  return (
    <div
      className="overflow-x-auto whitespace-nowrap scrollbar-hidden max-w-full select-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={blockRef}
    >
      {children}
    </div>
  );
};

export default ScrollableBlock;
