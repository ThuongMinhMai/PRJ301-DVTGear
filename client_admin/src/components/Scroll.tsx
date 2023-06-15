"use client";

import React, { useRef } from "react";

type ScrollableBlockProps = {
  children: React.ReactNode;
};

const ScrollableBlock = ({ children }: ScrollableBlockProps) => {
  const blockRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const scrollAmount = event.deltaY;
    if (blockRef.current) {
      blockRef.current.scrollLeft += scrollAmount;
    }
  };

  return (
    <div
      className="overflow-x-auto whitespace-nowrap scrollbar-hidden max-w-full"
      onWheel={handleScroll}
      ref={blockRef}
    >
      {children}
    </div>
  );
};

export default ScrollableBlock;
