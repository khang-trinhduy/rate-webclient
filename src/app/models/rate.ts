export interface Rate {
  _id: string;
  name: string;
  link: string;
  type: string;
  code: string;
  interestRates: Interest[];
  loanRates: Loan[];
}

export interface Interest {
  _id: string;
  value: number;
  threshold: string;
  loc: string;
  offer: number;
  period: number;
  lastUpdated: Date;
  details: string[];
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
