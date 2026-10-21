export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Services' },
  { href: '/clients', label: 'Clients' },
  { href: '/contact', label: 'Contact' },
] as const

export const contactInfo = {
  email: 'info@epiphanyats.ca',
  phone: '(587) 334-7315',
  phoneHref: 'tel:+15873347315',
  addressLines: ['Epiphany Accounting & Tax Services', '#1402, 10030 – 114 Street NW', 'Edmonton, AB T5K 1R3'],
  hours: [
    { label: 'Monday – Friday', value: '5PM – 8PM' },
    { label: 'Weekends & Holidays', value: '10AM – 8PM' },
  ],
}

export const homeServices = [
  {
    title: 'Bookkeeping',
    summary:
      'At Epiphany Accounting & Tax Services, we can help you select the proper organizational structure and secure adequate financing as you start your business. We will then work with you throughout the year to solve any business issues should they arise.',
  },
  {
    title: 'Personnel Tax',
    summary:
      'We provide personal tax service for self-employed or sole proprietors, partnerships, rental properties and various other sources of income. We compare tax documents you make available to us with those pulled out from the Canada Revenue Agency database to reduce at a max any inconsistencies.',
  },
  {
    title: 'Corporate Tax',
    summary:
      'Getting your corporate tax return done by an experienced bookkeeper in private corporation minimizes the risks of missing out crucial information and/or deduction to be claimed.',
  },
  {
    title: 'Payroll',
    summary:
      'Epiphany Accounting & Tax Services is happy to assist you with payroll setup for small businesses across any industry. We are using a major payroll software that is implemented for your business.',
  },
  {
    title: 'Financial Advisor',
    summary:
      'At Epiphany Accounting & Tax Services, our primary objective is helping you to reach your goals. They may be funding a college education, increasing your current income/cash flow or achieving a comfortable retirement. We can help you by reviewing what you currently have in place as investments, insurance policies, etc., and developing a strategy to get you where you want to be.',
  },
] as const

export type ServiceDetail = {
  id: string
  title: string
  paragraphs: string[]
  listIntro?: string
  list?: string[]
}

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'bookkeeping',
    title: 'Bookkeeping',
    paragraphs: [
      'At Epiphany Accounting & Tax Services, we can help you select the proper organizational structure and secure adequate financing as you start your business. We will then work with you throughout the year to solve any business issues should they arise.',
      'We can support your business with all payroll functions, bank reconciliations, cash balance reports, maintaining general ledgers, preparing balance sheets, income statements and else. Likewise, we will ensure that all of your obligatory filing requirements are completed on time and won’t have to pay any more tax than necessary.',
      'We mainly assist small businesses from all spheres. Whether you need bi-weekly, quarterly, monthly or annual bookkeeping services to meet your business and/or personal needs, we have a plan to keep you ready to make decisions. Should you require assistance in dealing directly with tax authorities, we can serve as your representative.',
    ],
  },
  {
    id: 'personal-tax',
    title: 'Personnel Tax',
    paragraphs: [
      'We provide personal tax service for self-employed or sole proprietors, partnerships, rental properties and various other sources of income. We compare tax documents you make available to us with those pulled out from the Canada Revenue Agency database to reduce at a max any inconsistencies.',
    ],
    listIntro: 'Furthermore, we can help with tax planning and other tax advice such as:',
    list: [
      'T4 preparation for proprietorship',
      'Counselling on income-splitting opportunities',
      'Advising on deductible expense items for tax',
      'Use of home-office and related expenses',
      'Writing-off of miscellaneous employment expenses',
      'Advising on meal and lodging expenses',
      'Calculating RRSP maximum contributions and/or deduction limits',
    ],
  },
  {
    id: 'corporate-tax',
    title: 'Corporate Tax',
    paragraphs: [
      'Getting your corporate tax return done by an experienced bookkeeper in private corporation minimizes the risks of missing out crucial information and/or deduction to be claimed.',
    ],
    listIntro: 'At Epiphany Accounting & Tax Services, we prepare:',
    list: [
      'Payroll and T4 filings',
      'T3010 Registered Charity Information Return',
      'T2 Corporate Income Tax Return',
      'T5 filings – dividends',
      'T5018 filings – Construction subcontractors',
      'T5013 filings for Partnerships',
      'GST/HST',
      'Counselling on employee’s status vs. subcontractors according to the tax authorities view',
      'Writing-off of deductible expense items for tax',
      'Counselling on tax strategies in regard to corporate salary threshold vs. dividend',
    ],
  },
  {
    id: 'tax-strategies',
    title: 'Tax Strategies',
    paragraphs: [
      'Doing your taxes takes more than just filling out forms. That requires a great understanding of the tax laws. We invest time to understand and assess your unique tax situation, and answer questions about compliance issues you may be experiencing.',
      'Therefore, we aim to make everything less taxing for you by ensuring you’re paying your fair share, and benefiting from a clever tax strategy that addresses your actual as well as anticipated needs.',
    ],
  },
  {
    id: 'consulting',
    title: 'Consulting Services',
    paragraphs: [
      'Epiphany Accounting & Tax Services has been a fixture in the small business world across Edmonton for years. We provide accounting and consulting services to various types of small businesses and have countless years of in-depth experience with service providers from many spheres.',
      'We are deeply committed to adding significant value to the small companies we serve and to helping our customers’ businesses operate as efficiently and profitably as possible. To those who are looking toward the next phase of growth, we do offer strategy consulting services as well.',
    ],
  },
  {
    id: 'payroll',
    title: 'Payroll',
    paragraphs: [
      'Epiphany Accounting & Tax Services is happy to assist you with payroll setup for small businesses across any industry. We are using a major payroll software that is implemented for your business.',
      'Payroll tax preparation: if you already ran payroll and need assistance with your filings, please contact us directly at (587) 334-7315.',
    ],
    listIntro: 'We can help with any of the following:',
    list: [
      'Setup of new payroll system for new/existing business',
      'Monthly/quarterly payroll tax filings',
      'Workers compensation setup',
      'Employment Insurance',
      'Employee benefits (RRSP, Health & Life insurance, etc.)',
    ],
  },
  {
    id: 'financial-advisor',
    title: 'Financial Advisor',
    paragraphs: [
      'At Epiphany Accounting & Tax Services, our primary objective is helping you to reach your goals. They may be funding a college education, increasing your current income/cash flow or achieving a comfortable retirement.',
      'We can help you by reviewing what you currently have in place as investments, insurance policies, etc., and developing a strategy to get you where you want to be.',
    ],
  },
]

export const industries = [
  'Cleaning Services',
  'Commission-Only Sales Agents',
  'Construction Companies',
  'Convenience Stores',
  'Day Cares',
  'Doctors',
  'Engineers',
  'Home Day Cares',
  'Gas Stations',
  'Grocery Stores',
  'Professional Corporations',
  'Restaurants',
  'Retail Businesses',
  'Sub-Contractors',
  'Taxi Drivers',
  'Trucking',
]
