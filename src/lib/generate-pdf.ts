export async function generatePDF(
  element: HTMLElement,
  name: string,
  assessmentYear: string
): Promise<void> {
  const html2pdf = (await import('html2pdf.js')).default;

  const safeName = name.trim().replace(/[^a-zA-Z0-9_\-\s]/g, '').replace(/\s+/g, '_') || 'Taxpayer';
  const filename = `IT11GA_${safeName}_${assessmentYear}.pdf`;

  await html2pdf()
    .set({
      margin: 10,
      filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      // pagebreak is supported by html2pdf.js but missing from its bundled types
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'], avoid: ['.pdf-section'] },
    } as Record<string, unknown>)
    .from(element)
    .save();
}
