import Link from 'next/link';
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
} from 'lucide-react';

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-green-deep overflow-hidden">
        <div className="hero-glow" />
        <div className="hero-dots relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left — copy */}
              <div className="text-white">
                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] mb-6">
                  Know Your Exact Tax.{' '}
                  <span className="gold-underline">File It Yourself.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/85 max-w-lg mb-10 leading-relaxed">
                  Our free calculator covers all six income heads, investment
                  rebates, and slab-wise breakdowns for Bangladesh taxpayers.
                  Then our guide walks you through filing on the NBR portal.
                  No lawyer or consultant needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/calculator"
                    className="inline-flex items-center justify-center gap-2 bg-gold text-white font-bold px-8 py-4 rounded-xl hover:bg-[#D4A23A] transition-colors text-base shadow-lg shadow-gold/30"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate My Tax
                  </Link>
                  <Link
                    href="/guide"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/15 hover:border-white/60 transition-all text-base"
                  >
                    <BookOpen className="w-5 h-5" />
                    Read the Filing Guide
                  </Link>
                </div>
              </div>

              {/* Right — preview card */}
              <div className="hidden md:flex justify-center">
                <div className="preview-card bg-white rounded-2xl p-7 w-full max-w-sm border border-white/20">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                    <span className="text-xs font-bold text-ink-muted uppercase tracking-widest">
                      Sample Result
                    </span>
                  </div>
                  <table className="w-full text-sm mb-5">
                    <thead>
                      <tr className="border-b-2 border-green-deep/10">
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
                    <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-green-deep">
                      BDT 48,750
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-center mb-4 text-ink">
            Three Tools. Zero Guesswork.
          </h2>
          <p className="text-ink-muted text-center mb-12 max-w-2xl mx-auto">
            Most Bangladeshi taxpayers pay a consultant BDT 5,000-15,000 for a
            simple return. These free tools put that knowledge in your hands.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Calculator className="w-6 h-6" />}
              title="Tax Calculator"
              description="Answer questions about your income and investments. Get a complete slab-wise breakdown with your exact payable amount in under 10 minutes."
              href="/calculator"
            />
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Filing Guide"
              description="Never used the NBR e-Return portal? Our guide covers every screen, from TIN registration to clicking Submit and downloading your receipt."
              href="/guide"
            />
            <FeatureCard
              icon={<Scale className="w-6 h-6" />}
              title="Tax Rules Reference"
              description="Current slabs, exemption limits, minimum tax rates, and surcharge rules for AY 2024-2025 through 2026-2027. All in one place."
              href="/tax-rules"
            />
          </div>
        </div>
      </section>

      {/* ─── TAX SLABS ─── */}
      <section className="py-20 bg-green-mist">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-center mb-3 text-ink">
            How Much Will You Pay?
          </h2>
          <p className="text-ink-muted text-center mb-10">
            Bangladesh uses progressive tax slabs. You only pay the higher rate on
            income above each threshold, not on your entire income.
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl card-elevated overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-green-deep text-white">
                  <th className="text-left px-6 py-4 font-bold text-sm">
                    Income Range
                  </th>
                  <th className="text-right px-6 py-4 font-bold text-sm">
                    Tax Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                <SlabRow range="Up to BDT 3,75,000" rate="0%" intensity={0} />
                <SlabRow range="Next BDT 3,00,000" rate="10%" intensity={1} />
                <SlabRow range="Next BDT 4,00,000" rate="15%" intensity={2} />
                <SlabRow range="Next BDT 5,00,000" rate="20%" intensity={3} />
                <SlabRow range="Next BDT 20,00,000" rate="25%" intensity={4} />
                <SlabRow range="Remaining amount" rate="30%" intensity={5} />
              </tbody>
            </table>
            <div className="px-6 py-3.5 bg-surface text-sm text-ink-muted border-t border-rule">
              Women, seniors (65+), disabled persons, and freedom fighters get
              higher tax-free thresholds.{' '}
              <Link
                href="/tax-rules/slabs"
                className="text-green-deep font-semibold hover:underline"
              >
                See all categories →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-center mb-4 text-ink">
            From Confused to Filed in Four Steps
          </h2>
          <p className="text-ink-muted text-center mb-14 max-w-xl mx-auto">
            No tax jargon. No account required. Just answer a few questions and
            get your result.
          </p>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-green-deep/20" />
              <div className="grid grid-cols-4 gap-6 relative">
                <TimelineStep
                  step={1}
                  icon={<ClipboardList className="w-5 h-5" />}
                  title="Enter Your Income"
                  description="Salary, business, rent, capital gains. Enter what applies to you and skip the rest."
                />
                <TimelineStep
                  step={2}
                  icon={<PieChart className="w-5 h-5" />}
                  title="Claim Your Rebate"
                  description="Add DPS, insurance, provident fund, and other investments. We calculate your 15% rebate."
                />
                <TimelineStep
                  step={3}
                  icon={<Calculator className="w-5 h-5" />}
                  title="See Your Breakdown"
                  description="Get a slab-by-slab computation showing exactly how your tax was calculated."
                />
                <TimelineStep
                  step={4}
                  icon={<FileCheck className="w-5 h-5" />}
                  title="File on the NBR Portal"
                  description="Follow our screen-by-screen guide to submit your e-Return and download your receipt."
                />
              </div>
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-0">
            <VerticalTimelineStep
              step={1}
              title="Enter Your Income"
              description="Salary, business, rent, capital gains. Enter what applies to you and skip the rest."
              isLast={false}
            />
            <VerticalTimelineStep
              step={2}
              title="Claim Your Rebate"
              description="Add DPS, insurance, provident fund, and other investments. We calculate your 15% rebate."
              isLast={false}
            />
            <VerticalTimelineStep
              step={3}
              title="See Your Breakdown"
              description="Get a slab-by-slab computation showing exactly how your tax was calculated."
              isLast={false}
            />
            <VerticalTimelineStep
              step={4}
              title="File on the NBR Portal"
              description="Follow our screen-by-screen guide to submit your e-Return and download your receipt."
              isLast={true}
            />
          </div>
        </div>
      </section>

      {/* ─── WHY FILE ─── */}
      <section className="py-20 bg-gold-light">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold text-center mb-3 text-ink">
            Skipping Your Return? Here&apos;s What You Lose.
          </h2>
          <p className="text-ink-muted text-center mb-10 max-w-xl mx-auto">
            A filed tax return is required for more services than most people
            realize. Without one, you can&apos;t:
          </p>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Get or renew your TIN certificate',
              'Apply for bank loans or credit cards',
              'Obtain a trade license or incorporate a company',
              'Get a visa for foreign travel',
              'Register property worth more than BDT 1 lakh',
              'Set up utility connections in city corporation areas',
            ].map((reason) => (
              <div
                key={reason}
                className="flex items-start gap-3 bg-white rounded-xl p-5 card-elevated border-l-4 border-l-gold"
              >
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-ink text-sm font-medium">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / TRUST ─── */}
      <section className="relative py-24 bg-gradient-to-br from-green-deep via-green-dark to-[#003D2B] overflow-hidden">
        <div className="hero-dots absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-gold" />
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold mb-5 text-white">
            100% Private. No Server. No Sign-Up.
          </h2>
          <p className="text-white/75 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Every calculation runs entirely in your browser. Your salary,
            investments, and personal details never leave your device. There is
            no account to create and nothing to download.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-gold text-white font-bold px-10 py-4 rounded-xl hover:bg-[#D4A23A] transition-colors text-lg shadow-lg shadow-black/20"
          >
            Calculate My Tax Now
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
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-surface-raised rounded-2xl border-l-4 border-l-gold p-7 card-elevated hover:translate-y-[-3px] transition-all duration-200 group"
    >
      <div className="w-12 h-12 rounded-xl bg-green-mist text-green-deep flex items-center justify-center mb-5 group-hover:bg-green-deep group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold mb-2 text-ink group-hover:text-green-deep transition-colors">
        {title}
      </h3>
      <p className="text-ink-muted text-sm leading-relaxed mb-4">{description}</p>
      <div className="text-green-deep font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
        Get started <ArrowRight className="w-4 h-4" />
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
    <tr className={`border-b border-rule/50 ${INTENSITY_CLASSES[intensity]}`}>
      <td className="px-6 py-4 text-ink font-medium">
        {range}
      </td>
      <td className="px-6 py-4 text-right">
        <span className="inline-block bg-green-deep text-white text-xs font-bold px-2.5 py-1 rounded-md">
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
      <div className="w-16 h-16 rounded-2xl bg-green-deep text-white flex items-center justify-center relative z-10 mb-5 shadow-lg shadow-green-deep/20">
        {icon}
      </div>
      <span className="text-xs font-bold text-gold uppercase tracking-wider mb-1.5">
        Step {step}
      </span>
      <h3 className="font-[family-name:var(--font-display)] font-bold text-ink mb-1.5 text-sm">
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
        <div className="w-10 h-10 rounded-xl bg-green-deep text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-md">
          {step}
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-green-deep/20 my-1" />}
      </div>
      <div className="pb-8">
        <span className="text-xs font-bold text-gold uppercase tracking-wider">
          Step {step}
        </span>
        <h3 className="font-[family-name:var(--font-display)] font-bold text-ink text-sm mt-0.5">
          {title}
        </h3>
        <p className="text-ink-muted text-xs mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
