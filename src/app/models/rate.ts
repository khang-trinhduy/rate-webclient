export interface Rate {
  _id: string;
  name: string;
  normalized: string;
  link: string;
  type: string;
  code: string;
  interestRates: {
    unlimit: Interest;
    oneW: Interest;
    twoW: Interest;
    threeW: Interest;
    fourW: Interest;
    threeM: Interest;
    sixM: Interest;
    nineM: Interest;
    twelveM: Interest;
    eighteenM: Interest;
    twentyFourM: Interest;
    thirtySixM: Interest;
  };
  loanRates: Loan[];
}

export interface Card {
  _id: string;
  rate: number;
  period: number;
  periodType: string;
  type: string;
  source: string;
  updated: Date;
}

export interface Source {
  _id: string;
  name: string;
  value: string;
  type: string;
  rate: string;
}

export interface Interest {
  _id: string;
  value: number;
  bank: string;
  threshold: string;
  type: string;
  withdraw: string;
  period: number;
  loc: string;
  offer: string[];
  require: string[];
  source: Source;
  lastUpdated: Date;
  gift: boolean;
}

export interface Loan {
  _id: string;
  value: number;
  threshold: string;
  loc: string;
  offer: number;
  type: string;
  lastUpdated: Date;
  details: string[];
}

export interface Filter {
  loc: string;
  money: number;
  deposit: number;
  withdraw: number;
}

export interface Row {
  code: string;
}

export interface Stat {
  type: string;
  maximum: number;
  minimum: number;
  count: number;
  _id: string;
}

export interface Information {
  _id: string;
  nativeName: string;
  tradeName: string;
  founded: Date;
  revenue: number;
  employees: number;
  website: string;
  logo: string;
  headquarter: string;
}

export interface Utility {
  _id: string;
  benefits: string[];
  requires: string[];
  documents: string[];
  code: string;
}
