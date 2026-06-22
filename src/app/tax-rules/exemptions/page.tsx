import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exemptions & Thresholds',
};

export default function ExemptionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Exemptions & Thresholds</h1>
      <p className="text-muted mb-10">
        Not every taka you earn is taxable. Salary allowances have exemption
        caps, investments earn you a 15% rebate, and every taxpayer has a
        minimum tax floor. Here are the exact numbers.
      </p>

      {/* Salary Exemptions */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Salary Exemptions</h2>
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Allowance
                </th>
                <th className="text-left px-6 py-3 font-semibold">
                  Exemption Limit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">
                  House Rent Allowance (HRA)
                </td>
                <td className="px-6 py-3">
                  Lower of: actual HRA, 50% of basic salary, or BDT 3,00,000
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">Medical Allowance</td>
                <td className="px-6 py-3">
                  Lower of: actual medical allowance, 10% of basic salary, or
                  BDT 1,20,000
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">
                  Conveyance Allowance
                </td>
                <td className="px-6 py-3">
                  Lower of: actual allowance or BDT 30,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          The exempted portion is deducted from the respective allowance. Only
          the excess is added to taxable income.
        </p>
      </section>

      {/* Investment Rebate */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Investment Tax Rebate</h2>
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="mb-4">
            Taxpayers can claim a rebate of <strong>15%</strong> on eligible
            investments. The eligible amount is the lowest of:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Total eligible investment amount</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>20% of total taxable income</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>BDT 10,00,000 (ten lakh)</span>
            </li>
          </ul>

          <h3 className="font-semibold mb-3">Eligible Investments Include:</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm">
            {[
              'Life insurance premium',
              'Deposit pension scheme (DPS)',
              'Employee provident fund contribution',
              'Government savings certificates',
              'Investment in listed stocks/shares',
              'Donation to approved institutions',
              'Contribution to benevolent fund',
              'Investment in mutual funds',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimum Tax */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Minimum Tax</h2>
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left px-6 py-3 font-semibold">
                  Location
                </th>
                <th className="text-right px-6 py-3 font-semibold">
                  Minimum Tax
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3">
                  Dhaka & Chattogram City Corporation
                </td>
                <td className="px-6 py-3 text-right font-semibold">
                  BDT 5,000
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3">Other City Corporations</td>
                <td className="px-6 py-3 text-right font-semibold">
                  BDT 4,000
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-3">Other Areas</td>
                <td className="px-6 py-3 text-right font-semibold">
                  BDT 3,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-muted mt-3">
          If your calculated tax (after rebate) is less than the minimum tax for
          your location, the minimum tax amount applies instead. For AY 2026-2027,
          the minimum tax is a flat BDT 5,000 regardless of location.
        </p>
      </section>
    </div>
  );
}
