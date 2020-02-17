export interface Rate {
  _id: string;
  name: string;
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
