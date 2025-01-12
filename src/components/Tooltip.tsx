import React, { useState } from 'react';
import { useFloating, offset, flip, shift } from '@floating-ui/react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  id?: string;
}

export function Tooltip({ content, children, id }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs } = useFloating({
    placement: 'top',
    middleware: [offset(5), flip(), shift()],
  });

const tooltipId = id || `tooltip-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div
      ref={refs.setReference}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      aria-describedby={tooltipId}
    >
      {children}
      {isOpen && (
        <div
          ref={refs.setFloating}
          id={tooltipId}
          role="tooltip"
          className="z-50 px-2 py-1 text-sm text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg"
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: 'max-content',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
