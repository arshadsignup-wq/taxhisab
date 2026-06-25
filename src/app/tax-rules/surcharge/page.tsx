import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Surcharge Rules',
};

export default function SurchargePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Surcharge Rules</h1>
      <p className="text-ink-muted mb-10">
        If your net wealth exceeds BDT 4 crore or you own more than one motor
        vehicle, you pay a surcharge on top of your regular income tax. Most
        individual filers are not affected. Check the thresholds below
        to be sure.
      </p>

      {/* Net Wealth Surcharge */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Surcharge on Net Wealth
        </h2>
        <p className="text-ink-muted mb-4">
          If your net wealth (total assets minus liabilities) exceeds BDT 4
          crore, a surcharge applies on your calculated income tax amount.
        </p>
        <div className="bg-white rounded-xl border border-rule overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Net Wealth Range
                </th>
                <th className="text-right px-6 py-3 font-semibold">
                  Surcharge Rate (on tax)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              <tr className="hover:bg-surface-sunken">
                <td className="px-6 py-3">Up to BDT 4 crore</td>
                <td className="px-6 py-3 text-right font-semibold">
                  No surcharge
                </td>
              </tr>
              <tr className="hover:bg-surface-sunken">
                <td className="px-6 py-3">BDT 4 crore to BDT 10 crore</td>
                <td className="px-6 py-3 text-right font-semibold text-primary">
                  10%
                </td>
              </tr>
              <tr className="hover:bg-surface-sunken">
                <td className="px-6 py-3">BDT 10 crore to BDT 20 crore</td>
                <td className="px-6 py-3 text-right font-semibold text-primary">
                  20%
                </td>
              </tr>
              <tr className="hover:bg-surface-sunken">
                <td className="px-6 py-3">BDT 20 crore to BDT 50 crore</td>
                <td className="px-6 py-3 text-right font-semibold text-primary">
                  25%
                </td>
              </tr>
              <tr className="hover:bg-surface-sunken">
                <td className="px-6 py-3">Above BDT 50 crore</td>
                <td className="px-6 py-3 text-right font-semibold text-primary">
                  35%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-ink-muted mt-3">
          Minimum surcharge of BDT 5,000 applies if net wealth exceeds BDT 4
          crore.
        </p>
      </section>

      {/* Environmental Surcharge */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Environmental Surcharge (Vehicles)
        </h2>
        <div className="bg-white rounded-xl border border-rule p-6">
          <p className="mb-4">
            If you own more than one motor vehicle, an environmental surcharge
            applies:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>First vehicle: No surcharge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>
                Each additional vehicle: <strong>BDT 25,000</strong> per vehicle
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* How Surcharge Works */}
      <section>
        <h2 className="text-xl font-semibold mb-4">How Surcharge Is Applied</h2>
        <div className="bg-primary-light rounded-xl p-6">
          <p className="mb-3">
            <strong>Example:</strong> If your calculated income tax is BDT
            1,00,000 and your net wealth is BDT 6 crore:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Income tax</span>
              <span className="font-semibold">BDT 1,00,000</span>
            </div>
            <div className="flex justify-between">
              <span>Surcharge (10% of tax)</span>
              <span className="font-semibold">BDT 10,000</span>
            </div>
            <div className="flex justify-between border-t border-primary/20 pt-2">
              <span className="font-semibold">Total tax with surcharge</span>
              <span className="font-bold text-primary">BDT 1,10,000</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
