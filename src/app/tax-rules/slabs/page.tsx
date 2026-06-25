import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax Slabs & Rates',
};

export default function SlabsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">
        Income Tax Slabs & Rates
      </h1>
      <p className="text-ink-muted mb-10">
        Bangladesh taxes income progressively. You pay a higher rate only on
        the portion of income that falls into each slab, not on your entire
        income. The tax-free threshold varies by taxpayer category.
      </p>

      {/* AY 2026-2027 */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Assessment Year 2026-2027
          <span className="text-sm font-normal text-primary ml-2 bg-primary/10 px-2 py-0.5 rounded">
            Current
          </span>
        </h2>

        <h3 className="text-lg font-medium mb-3">Tax-Free Thresholds</h3>
        <div className="bg-white rounded-xl border border-rule overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Taxpayer Category
                </th>
                <th className="text-right px-6 py-3 font-semibold">
                  Tax-Free Threshold
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <ThresholdRow category="Male (General)" amount="BDT 3,75,000" />
              <ThresholdRow category="Female" amount="BDT 4,25,000" />
              <ThresholdRow category="Senior Citizen (65+)" amount="BDT 4,25,000" />
              <ThresholdRow category="Person with Disability" amount="BDT 5,00,000" />
              <ThresholdRow category="War-wounded Freedom Fighter" amount="BDT 5,25,000" />
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Progressive Tax Slabs</h3>
        <div className="bg-white rounded-xl border border-rule overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Taxable Income (above threshold)
                </th>
                <th className="text-right px-6 py-3 font-semibold">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <SlabRow range="First BDT 3,00,000" rate="10%" />
              <SlabRow range="Next BDT 4,00,000" rate="15%" />
              <SlabRow range="Next BDT 5,00,000" rate="20%" />
              <SlabRow range="Next BDT 20,00,000" rate="25%" />
              <SlabRow range="Remaining amount" rate="30%" />
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Example Calculation</h3>
        <div className="bg-primary-light rounded-xl p-6">
          <p className="font-medium mb-3">
            A general male taxpayer with total income of BDT 10,00,000:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>First BDT 3,75,000 (tax-free)</span>
              <span className="font-semibold">BDT 0</span>
            </div>
            <div className="flex justify-between">
              <span>Next BDT 3,00,000 @ 10%</span>
              <span className="font-semibold">BDT 30,000</span>
            </div>
            <div className="flex justify-between">
              <span>Next BDT 3,25,000 @ 15%</span>
              <span className="font-semibold">BDT 48,750</span>
            </div>
            <div className="flex justify-between border-t border-primary/20 pt-2 mt-2">
              <span className="font-semibold">Total Tax</span>
              <span className="font-bold text-primary">BDT 78,750</span>
            </div>
          </div>
          <p className="text-xs text-ink-muted mt-3">
            Taxable income above threshold = 10,00,000 - 3,75,000 = 6,25,000.
            First 3,00,000 at 10% = 30,000. Remaining 3,25,000 at 15% = 48,750.
          </p>
        </div>
      </section>

      {/* AY 2025-2026 */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          Assessment Year 2025-2026
        </h2>

        <h3 className="text-lg font-medium mb-3">Tax-Free Thresholds</h3>
        <div className="bg-white rounded-xl border border-rule overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-ink/80 text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Taxpayer Category
                </th>
                <th className="text-right px-6 py-3 font-semibold">
                  Tax-Free Threshold
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <ThresholdRow category="Male (General)" amount="BDT 3,50,000" />
              <ThresholdRow category="Female" amount="BDT 4,00,000" />
              <ThresholdRow category="Senior Citizen (65+)" amount="BDT 4,00,000" />
              <ThresholdRow category="Person with Disability" amount="BDT 4,75,000" />
              <ThresholdRow category="War-wounded Freedom Fighter" amount="BDT 5,00,000" />
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Progressive Tax Slabs</h3>
        <div className="bg-white rounded-xl border border-rule overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-ink/80 text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Taxable Income (above threshold)
                </th>
                <th className="text-right px-6 py-3 font-semibold">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <SlabRow range="First BDT 1,00,000" rate="5%" />
              <SlabRow range="Next BDT 4,00,000" rate="10%" />
              <SlabRow range="Next BDT 5,00,000" rate="15%" />
              <SlabRow range="Next BDT 5,00,000" rate="20%" />
              <SlabRow range="Next BDT 20,00,000" rate="25%" />
              <SlabRow range="Remaining amount" rate="30%" />
            </tbody>
          </table>
        </div>
      </section>

      {/* AY 2024-2025 */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Assessment Year 2024-2025
        </h2>

        <h3 className="text-lg font-medium mb-3">Tax-Free Thresholds</h3>
        <div className="bg-white rounded-xl border border-rule overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="bg-ink/80 text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Taxpayer Category
                </th>
                <th className="text-right px-6 py-3 font-semibold">
                  Tax-Free Threshold
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <ThresholdRow category="Male (General)" amount="BDT 3,50,000" />
              <ThresholdRow category="Female" amount="BDT 4,00,000" />
              <ThresholdRow category="Senior Citizen (65+)" amount="BDT 4,00,000" />
              <ThresholdRow category="Person with Disability" amount="BDT 4,75,000" />
              <ThresholdRow category="War-wounded Freedom Fighter" amount="BDT 5,00,000" />
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-3">Progressive Tax Slabs</h3>
        <div className="bg-white rounded-xl border border-rule overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-ink/80 text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Taxable Income (above threshold)
                </th>
                <th className="text-right px-6 py-3 font-semibold">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <SlabRow range="First BDT 1,00,000" rate="5%" />
              <SlabRow range="Next BDT 4,00,000" rate="10%" />
              <SlabRow range="Next BDT 5,00,000" rate="15%" />
              <SlabRow range="Next BDT 5,00,000" rate="20%" />
              <SlabRow range="Remaining amount" rate="25%" />
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function ThresholdRow({
  category,
  amount,
}: {
  category: string;
  amount: string;
}) {
  return (
    <tr className="hover:bg-surface-sunken">
      <td className="px-6 py-3">{category}</td>
      <td className="px-6 py-3 text-right font-semibold">{amount}</td>
    </tr>
  );
}

function SlabRow({ range, rate }: { range: string; rate: string }) {
  return (
    <tr className="hover:bg-surface-sunken">
      <td className="px-6 py-3">{range}</td>
      <td className="px-6 py-3 text-right font-semibold text-primary">
        {rate}
      </td>
    </tr>
  );
}
