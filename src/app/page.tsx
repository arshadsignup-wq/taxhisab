'use client';

import Link from 'next/link';
import { useTranslation } from '@/i18n';
import {
  Calculator,
  BookOpen,
  Scale,
  Shield,
  ArrowRight,
  CheckCircle,
  ClipboardList,
  PieChart,
  FileCheck,
  Lock,
  Sparkles,
  UserX,
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslation();

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-hero-gradient overflow-hidden">
        <div className="hero-glow" />
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
            <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
              {/* Left — copy */}
              <div className="text-white">
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6">
                  {t.home.heroTitle}{' '}
                  <span className="bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
                    {t.home.heroTitleAccent}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-white/85 max-w-lg mb-8 leading-relaxed">
                  {t.home.heroSubtitle}
                </p>

                {/* Trust badges */}
                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-white/70">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4" /> {t.home.trustPrivate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> {t.home.trustFree}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <UserX className="w-4 h-4" /> {t.home.trustNoSignup}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center gap-2 bg-cta text-white font-bold px-8 py-4 rounded-xl hover:bg-cta-dark transition-colors text-base shadow-lg shadow-cta/30"
                  >
                    <Calculator className="w-5 h-5" />
                    {t.home.calculateMyTax}
                  </Link>
                  <Link
                    href="/guide"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/15 hover:border-white/60 transition-all text-base"
                  >
                    <BookOpen className="w-5 h-5" />
                    {t.home.readFilingGuide}
                  </Link>
                </div>
              </div>

              {/* Right — preview card */}
              <div className="hidden md:flex justify-center">
                <div className="preview-card bg-white rounded-2xl p-7 w-full max-w-sm border border-white/20">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    <span className="text-xs font-bold text-ink-muted uppercase tracking-widest">
                      {t.home.sampleResult}
                    </span>
                  </div>
                  <table className="w-full text-sm mb-5">
                    <thead>
                      <tr className="border-b-2 border-primary/10">
                        <th className="text-left pb-2.5 text-ink-muted font-semibold text-xs">
                          Slab
                        </th>
                        <th className="text-right pb-2.5 text-ink-muted font-semibold text-xs">
                          Rate
                        </th>
                        <th className="text-right pb-2.5 text-ink-muted font-semibold text-xs">
                          Tax
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-ink">
                      <tr className="border-b border-rule/60">
                        <td className="py-2">First 3,75,000</td>
                        <td className="text-right text-ink-muted">0%</td>
                        <td className="text-right font-semibold">0</td>
                      </tr>
                      <tr className="border-b border-rule/60">
                        <td className="py-2">Next 3,00,000</td>
                        <td className="text-right text-ink-muted">10%</td>
                        <td className="text-right font-semibold">30,000</td>
                      </tr>
                      <tr className="border-b border-rule/60">
                        <td className="py-2">Next 1,25,000</td>
                        <td className="text-right text-ink-muted">15%</td>
                        <td className="text-right font-semibold">18,750</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-gold/30 bg-gold-light -mx-7 -mb-7 px-7 py-4 rounded-b-2xl">
                    <span className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                      Net Payable
                    </span>
                    <span className="font-display text-2xl font-extrabold text-primary">
                      BDT 48,750
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social proof stat bar */}
          <div className="border-t border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-sm text-white/70">
              <span>{t.home.socialProof1}</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>{t.home.socialProof2}</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>{t.home.socialProof3}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-8 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-4 text-ink">
            {t.home.featuresTitle}
          </h2>
          <p className="text-ink-muted text-center mb-12 max-w-2xl mx-auto">
            {t.home.featuresSubtitle}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calculator className="w-6 h-6" />}
              title={t.home.featureCalcTitle}
              description={t.home.featureCalcDesc}
              href="/calculator"
              getStartedLabel={t.home.getStarted}
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title={t.home.featureGuideTitle}
              description={t.home.featureGuideDesc}
              href="/guide"
              getStartedLabel={t.home.getStarted}
            />
            <FeatureCard
              icon={<Scale className="w-6 h-6" />}
              title={t.home.featureRulesTitle}
              description={t.home.featureRulesDesc}
              href="/tax-rules"
              getStartedLabel={t.home.getStarted}
            />
          </div>
        </div>
      </section>

      {/* ─── TAX SLABS ─── */}
      <section id="tax-slabs" className="py-8 md:py-20 bg-surface-sunken">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-3 text-ink">
            {t.home.slabsTitle}
          </h2>
          <p className="text-ink-muted text-center mb-10">
            {t.home.slabsSubtitle}
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl elevation-2 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-ink text-white">
                  <th className="text-left px-6 py-4 font-bold text-sm">
                    Income Range
                  </th>
                  <th className="text-right px-6 py-4 font-bold text-sm">
                    Tax Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.home.slabRanges.map((slab, i) => (
                  <SlabRow key={i} range={slab.range} rate={slab.rate} intensity={i} />
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3.5 bg-surface-sunken text-sm text-ink-muted border-t border-rule">
              {t.home.slabsFooter}{' '}
              <Link
                href="/tax-rules/slabs"
                className="text-cta font-semibold hover:underline"
              >
                {t.home.seeAllCategories}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="py-8 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-4 text-ink">
            {t.home.howItWorksTitle}
          </h2>
          <p className="text-ink-muted text-center mb-14 max-w-xl mx-auto">
            {t.home.howItWorksSubtitle}
          </p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-rule" />
              <div className="grid grid-cols-4 gap-6 relative">
                <TimelineStep
                  step={1}
                  icon={<ClipboardList className="w-5 h-5" />}
                  title={t.home.step1Title}
                  description={t.home.step1Desc}
                />
                <TimelineStep
                  step={2}
                  icon={<PieChart className="w-5 h-5" />}
                  title={t.home.step2Title}
                  description={t.home.step2Desc}
                />
                <TimelineStep
                  step={3}
                  icon={<Calculator className="w-5 h-5" />}
                  title={t.home.step3Title}
                  description={t.home.step3Desc}
                />
                <TimelineStep
                  step={4}
                  icon={<FileCheck className="w-5 h-5" />}
                  title={t.home.step4Title}
                  description={t.home.step4Desc}
                />
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-0">
            <VerticalTimelineStep
              step={1}
              title={t.home.step1Title}
              description={t.home.step1Desc}
              isLast={false}
            />
            <VerticalTimelineStep
              step={2}
              title={t.home.step2Title}
              description={t.home.step2Desc}
              isLast={false}
            />
            <VerticalTimelineStep
              step={3}
              title={t.home.step3Title}
              description={t.home.step3Desc}
              isLast={false}
            />
            <VerticalTimelineStep
              step={4}
              title={t.home.step4Title}
              description={t.home.step4Desc}
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* ─── WHY FILE ─── */}
      <section id="why-file" className="py-8 md:py-20 bg-warning-light">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-3 text-ink">
            {t.home.whyFileTitle}
          </h2>
          <p className="text-ink-muted text-center mb-10 max-w-xl mx-auto">
            {t.home.whyFileSubtitle}
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {t.home.whyFileReasons.map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 bg-white rounded-xl p-5 elevation-1 border-l-4 border-l-warning"
              >
                <CheckCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <span className="text-ink text-sm font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / TRUST ─── */}
      <section id="privacy" className="relative py-12 md:py-24 bg-gradient-to-br from-ink via-[#1E293B] to-ink overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-5 text-white">
            {t.home.privacyTitle}
          </h2>
          <p className="text-white/75 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            {t.home.privacySubtitle}
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-cta text-white font-bold px-10 py-4 rounded-xl hover:bg-cta-dark transition-colors text-lg shadow-lg shadow-cta/20"
          >
            {t.home.calculateMyTaxNow}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({
  icon,
  title,
  description,
  href,
  getStartedLabel,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  getStartedLabel: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-2xl p-7 elevation-2-interactive group"
    >
      <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold mb-2 text-ink group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-ink-muted text-sm leading-relaxed mb-4">{description}</p>
      <div className="text-cta font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        {getStartedLabel} <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

/* ─── Slab Row with intensity bar ─── */
const INTENSITY_CLASSES = [
  '',
  'slab-intensity-1',
  'slab-intensity-2',
  'slab-intensity-3',
  'slab-intensity-4',
  'slab-intensity-5',
];

function SlabRow({
  range,
  rate,
  intensity,
}: {
  range: string;
  rate: string;
  intensity: number;
}) {
  return (
    <tr className={`border-b border-rule/50 hover:bg-surface-sunken transition-colors ${INTENSITY_CLASSES[intensity]}`}>
      <td className="px-6 py-4 text-ink font-medium">
        {range}
      </td>
      <td className="px-6 py-4 text-right">
        <span className="inline-block bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-md">
          {rate}
        </span>
      </td>
    </tr>
  );
}

/* ─── Timeline Step (desktop) ─── */
function TimelineStep({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-cta text-white flex items-center justify-center relative z-10 mb-5 shadow-lg shadow-cta/20">
        {icon}
      </div>
      <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
        Step {step}
      </span>
      <h3 className="font-display font-bold text-ink mb-1.5 text-sm">
        {title}
      </h3>
      <p className="text-ink-muted text-xs leading-relaxed max-w-[180px]">
        {description}
      </p>
    </div>
  );
}

/* ─── Vertical Timeline Step (mobile) ─── */
function VerticalTimelineStep({
  step,
  title,
  description,
  isLast,
}: {
  step: number;
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-cta text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
          {step}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-rule my-1" />}
      </div>
      <div className="pb-8">
        <span className="text-xs font-bold text-gold uppercase tracking-wider">
          Step {step}
        </span>
        <h3 className="font-display font-bold text-ink text-sm mt-0.5">
          {title}
        </h3>
        <p className="text-ink-muted text-xs mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
