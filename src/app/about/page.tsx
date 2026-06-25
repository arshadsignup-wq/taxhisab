import type { Metadata } from 'next';
import AboutContent from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description:
    'TaxHisab is a free, private income tax calculator and e-Return filing guide built for Bangladesh taxpayers.',
};

export default function AboutPage() {
  return <AboutContent />;
}
