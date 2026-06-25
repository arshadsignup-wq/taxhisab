"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

function AccordionPanel({
  title,
  content,
  isOpen,
  onToggle,
}: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  // Update maxHeight on content changes while open
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      }
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div className="border-b border-rule last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-ink hover:bg-surface-sunken transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cta/30 focus-visible:ring-inset cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <ChevronDown
          className={[
            "h-4 w-4 text-ink-muted transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        />
      </button>

      <div
        style={{ maxHeight }}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
      >
        <div ref={contentRef} className="px-4 pb-4 text-sm text-ink-muted">
          {content}
        </div>
      </div>
    </div>
  );
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);

        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) {
            next.clear();
          }
          next.add(index);
        }

        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className="rounded-xl border border-rule bg-white overflow-hidden divide-y divide-rule">
      {items.map((item, index) => (
        <AccordionPanel
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndices.has(index)}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}
