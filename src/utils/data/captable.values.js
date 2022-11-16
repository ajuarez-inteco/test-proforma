const founding = {
  prefixName: 'Founding',
  shares: 10000000,
};

// TODO: validar campo DATE
const convertibleNote = {
  prefixName: 'Convertible Note',
  date: '',
  investment: 500000,
  interest: 5,
  discount: 20,
  conversionCap: 5000000,
  conversionRound: '',
};

// TODO: validar campo DATE
const safe = {
  prefixName: 'SAFE',
  date: '',
  investment: 500000,
  discount: 20,
  conversionCap: 5000000,
  conversionRound: '',
};

// TODO: validar campo DATE
const commonRound = {
  prefixName: 'Common Round',
  date: '',
  investment: 500000,
  preMoney: 2500000,
  shares: '',
  unitShare: 16.67,
  unitPrice: '',
  postMoney: 3000000,
};

// TODO: validar campo DATE
const preferredRound = {
  prefixName: 'Series',
  date: '',
  investment: '',
  preMoney: 25000000,
  annualDividend: 0.0,
  dividendType: 'simple',
  liquidationPreference: 1.0,
  participation: 'participating',
  antiDilution: 'none',
  shares: '',
  unitShare: 28.57,
  unitPrice: 2.50,
  postMoney: '',
};

// TODO: validar campo DATE
const issueOptionsWarrants = {
  prefixName: 'Options',
  date: '',
  shares: 1000000,
  unitShare: 0.18,
  exercisePrice: 0,
};

export const captableValues = {
  founding,
  convertibleNote,
  safe,
  commonRound,
  preferredRound,
  issueOptionsWarrants,
};
