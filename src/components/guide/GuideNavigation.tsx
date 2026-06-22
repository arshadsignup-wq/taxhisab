'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GuideNavigationProps {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}

export default function GuideNavigation({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: GuideNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-10 pt-6 border-t border-border">
      {prevHref ? (
        <Link
          href={prevHref}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <div>
            <div className="text-xs text-muted">Previous</div>
            <div className="font-medium">{prevLabel}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {nextHref ? (
        <Link
          href={nextHref}
          className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors text-right"
        >
          <div>
            <div className="text-xs text-muted">Next</div>
            <div className="font-medium">{nextLabel}</div>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
