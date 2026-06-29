export type Locale = 'en' | 'bn';

interface FieldTranslation {
  label: string;
  hint: string;
}

export interface Translations {
  common: {
    next: string;
    previous: string;
    total: string;
    calculate: string;
    edit: string;
    startOver: string;
    downloadPdf: string;
    generatingPdf: string;
    printResults: string;
    startCalculator: string;
    showDetails: string;
    hideDetails: string;
    remove: string;
    addAnother: string;
  };
  nav: {
    home: string;
    calculator: string;
    guide: string;
    taxRules: string;
    faq: string;
    about: string;
    calculateTax: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    getStarted: string;
    important: string;
    importantText: string;
    taxCalculator: string;
    filingGuide: string;
    taxSlabs: string;
    aboutTaxHisab: string;
    copyright: string;
    privacyNote: string;
  };
  calculator: {
    profile: {
      title: string;
      subtitle: string;
      categoryLabel: string;
      categoryHint: string;
      locationLabel: string;
      locationHint: string;
      assessmentYearLabel: string;
      assessmentYearHint: string;
      taxFreeThresholdLabel: string;
      taxFreeThresholdHint: string;
      incomeTypesLabel: string;
      incomeOptions: Record<string, { label: string; description: string }>;
    };
    personalInfo: {
      title: string;
      subtitle: string;
      fields: Record<string, FieldTranslation>;
    };
    salary: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
      totalGross: string;
      lessExemptions: string;
      taxableSalary: string;
    };
    business: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
      freelancerLabel: string;
      freelancerHint: string;
    };
    houseProperty: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      propertyLabel: string;
      typeLabel: string;
      typeOptions: Record<string, string>;
      fields: Record<string, FieldTranslation>;
      addProperty: string;
      removeProperty: string;
      netIncome: string;
    };
    capitalGains: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      assetTypeLabel: string;
      assetTypes: Record<string, string>;
      fields: Record<string, FieldTranslation>;
      addGain: string;
      removeGain: string;
    };
    agricultural: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
      expenseMethodLabel: string;
      flatRate: string;
      actual: string;
      netIncome: string;
    };
    financialAssets: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
    };
    otherIncome: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
    };
    taxExempted: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
      totalExempted: string;
    };
    investment: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      fields: Record<string, FieldTranslation>;
      totalInvestment: string;
      admissibleInvestment: string;
      rebateAmount: string;
    };
    taxPayments: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      tdsTitle: string;
      tdsSource: string;
      tdsAmount: string;
      addTds: string;
      advanceTaxTitle: string;
      advanceDate: string;
      advanceAmount: string;
      addAdvance: string;
      fields: Record<string, FieldTranslation>;
      totalPaid: string;
    };
    assetsLiabilities: {
      title: string;
      subtitle: string;
      infoTitle: string;
      infoText: string;
      assetsTitle: string;
      liabilitiesTitle: string;
      expensesTitle: string;
      fields: Record<string, FieldTranslation>;
      totalAssets: string;
      totalLiabilities: string;
      netWealth: string;
    };
    review: {
      title: string;
      subtitle: string;
      personalInfo: string;
      taxAlreadyPaid: string;
      it10bEntered: string;
      totalExempted: string;
      calculateTax: string;
      sectionLabels: Record<string, string>;
    };
  };
  result: {
    title: string;
    subtitle: string;
    part1Title: string;
    part2Title: string;
    part3Title: string;
    part4Title: string;
    part5Title: string;
    personalInfoLabels: Record<string, string>;
    incomeLabels: Record<string, string>;
    headOfIncome: string;
    amountBdt: string;
    sl: string;
    totalIncome: string;
    lessTaxExempted: string;
    totalTaxableIncome: string;
    taxFreeThreshold: string;
    taxableIncome: string;
    slabBreakdown: string;
    slabRange: string;
    rate: string;
    amount: string;
    tax: string;
    grossTaxOnIncome: string;
    totalEligibleInvestment: string;
    admissibleInvestment: string;
    taxRebate: string;
    netTaxAfterRebate: string;
    minimumTaxApplied: string;
    surchargeOnWealth: string;
    environmentalSurcharge: string;
    totalTaxPayable: string;
    tdsDeducted: string;
    advanceTaxPaid: string;
    taxRefundAdj: string;
    taxPaidWithReturn: string;
    totalTaxPaid: string;
    taxRefund: string;
    netTaxPayable: string;
    overpaidRefund: string;
    totalAssets: string;
    totalLiabilities: string;
    netWealth: string;
    netWealthSurchargeNote: string;
    addDetailsToggle: string;
    addDetailsDescription: string;
    noResultTitle: string;
    noResultText: string;
    noResultHint: string;
    computedTaxLess: string;
    minimumTaxOf: string;
    applies: string;
    schedule24A: string;
    totalTaxableSalary: string;
    schedule24B: string;
    selfOccupied: string;
  };
  labels: {
    categories: Record<string, string>;
    locations: Record<string, string>;
    assessmentYears: Record<string, string>;
  };
  home: {
    heroTitle: string;
    heroTitleAccent: string;
    heroSubtitle: string;
    trustPrivate: string;
    trustFree: string;
    trustNoSignup: string;
    calculateMyTax: string;
    readFilingGuide: string;
    sampleResult: string;
    socialProof1: string;
    socialProof2: string;
    socialProof3: string;
    featuresTitle: string;
    featuresSubtitle: string;
    featureCalcTitle: string;
    featureCalcDesc: string;
    featureGuideTitle: string;
    featureGuideDesc: string;
    featureRulesTitle: string;
    featureRulesDesc: string;
    getStarted: string;
    slabsTitle: string;
    slabsSubtitle: string;
    slabsFooter: string;
    seeAllCategories: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    whyFileTitle: string;
    whyFileSubtitle: string;
    whyFileReasons: string[];
    privacyTitle: string;
    privacySubtitle: string;
    calculateMyTaxNow: string;
    slabRanges: { range: string; rate: string }[];
  };
  faq: {
    title: string;
    subtitle: string;
    categories: {
      name: string;
      questions: { q: string; a: string }[];
    }[];
  };
  about: {
    title: string;
    subtitle: string;
    sections: { heading: string; content: string }[];
  };
  wizard: {
    stepOf: string;
    steps: Record<string, { label: string; shortLabel: string }>;
  };
  runningTotal: {
    income: string;
    tax: string;
    estimatedPayable: string;
    refund: string;
  };
}
