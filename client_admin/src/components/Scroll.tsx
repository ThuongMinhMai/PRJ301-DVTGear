'use client'

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
    <div className="w-full overflow-x-auto whitespace-nowrap overflow-y-hidden scrollbar-hidden pb-48" onWheel={handleScroll} ref={blockRef}>
      {children}
    </div>
  );
};

export default ScrollableBlock;
