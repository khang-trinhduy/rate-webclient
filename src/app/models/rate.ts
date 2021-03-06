export interface Bank {
  _id: string
  name: string
  normalized: string
  link: string
  type: string
  code: string
  interests: Interest[]
  loanRates: Loan[]
}

export interface Card {
  _id: string
  rate: number
  period: number
  periodType: string
  type: string
  source: string
  updated: Date
}

export interface Source {
  _id: string
  name: string
  value: string
  type: string
  rate: string
}

export interface Interest {
  _id: string
  value: number
  bank: string
  threshold: string
  type: string
  withdraw: string
  period: number
  loc: string
  offer: string[]
  require: string[]
  source: Source
  lastUpdate: Date
  gift: boolean
  gifts: Gift[]
  max: boolean
  online: boolean
}

export interface Gift {
  _id: string
  applyDate: Date
  content: string
}
export interface Loan {
  _id: string
  value: number
  threshold: string
  loc: string
  offer: number
  type: string
  lastUpdated: Date
  details: string[]
}

export interface Filter {
  loc: string
  money: number
  deposit: number
  withdraw: number
}

export interface Row {
  code: string
}

export interface Stat {
  period: string
  maximum: number
  minimum: number
  count: number
  _id: string
}

export interface Information {
  _id: string
  nativeName: string
  tradeName: string
  founded: Date
  revenue: number
  employees: number
  website: string
  logo: string
  headquarter: string
}

export interface Utility {
  _id: string
  benefits: string[]
  requires: string[]
  documents: string[]
  code: string
}
