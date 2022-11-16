const founding = {
  shares: {
    type: 'money',
    label: 'Shares',
    name: 'shares',
    tooltip: `Founding shares are the number of shares defined when the company is initially structured, before any employee options or equity financing. 10 million shares is the most common amount, even for small startups. These shares may be split between multiple founders (see the Shareholders tab). Shares in the company are not transferred to new investors or contributors; rather, new shares are "issued", which dilutes the value of the initial shares.`,
    placeholder: '',
  },
};

const convertibleNote = {
  date: {
    type: 'date',
    label: 'Date',
    name: 'date',
    tooltip: `This is the month that the round will be closed or the shares will be issued.`,
    placeholder: 'mmmm yy',
  },
  investment: {
    type: 'money',
    label: 'Investment Amount',
    name: 'investment',
    tooltip: `This is the total cash investment amount for the round.`,
    placeholder: '$0.00',
  },
  interest: {
    type: 'percentage',
    label: 'Interest',
    name: 'interest',
    tooltip: `Convertible Note holders often receive interest on their initial investment until the note converts to shares. The interest is paid out in additional shares at the close of the Conversion Round.`,
    placeholder: '',
  },
  discount: {
    type: 'percentage',
    label: 'Discount',
    name: 'discount',
    tooltip: `The Discount is applied to the price per share of the conversion round. Because Convertible Note and SAFE investors invest earlier than the conversion round, they typically receive a lower price per share, which gives them more shares for their investment. If the Discount is 20% and the conversion round share price is $5, the Convertible Note or SAFE converts at (1 - 20%) x $5 = $4 per share. Example: SAFE investors invest $500,000 at a discounted rate of 80%. One year later, a Series A is raised at $5 per share. The SAFE is converted into shares at 80% x $5 = $4 per share. This means the SAFE investors receive $500,000 / $4 per share = 125,000 shares.`,
    placeholder: '',
  },
  conversionCap: {
    type: 'money',
    label: 'Valuation Cap',
    name: 'conversionCap',
    tooltip: `The Valuation Cap (or "Conversion Cap") determines the maximum price per share that can be applied to convert a Convertible Note or SAFE. This helps to ensure that the Convertible Note or SAFE investors receive a reasonable amount of ownership, even if the value of the company increases more than expected. Shares are converted based on either the Discount or the Valuation Cap, whichever results in a lower price per share. Example: SAFE investors invest $500,000 at a discounted rate of 80%, with a valuation cap of $6,000,000. One year later, a Series A is raised at $5 per share at $10,000,000 pre-money valuation. The valuation cap divided by the pre-money value is $6,000,000 / $10,000,000 = 60%. Since this rate is lower than the discounted rate of 80%, we use the 60% rate. 60% x $5 per share = $3 per share.`,
    placeholder: '',
  },
  conversionRound: {
    type: 'option',
    label: 'Conversion Round',
    name: 'conversionRound',
    tooltip: `For a Convertible Note or SAFE investment, investors' shares are issued as part of a future priced round, or "Conversion Round". The valuation and terms of the Conversion Round (usually a Series A) will determine how many shares are issued to Convertible Note or SAFE investors.`,
    placeholder: '',
  },
};

const safe = {
  date: {
    type: 'date',
    label: 'Date',
    name: 'date',
    tooltip: `This is the month that the round will be closed or the shares will be issued.`,
    placeholder: 'mmmm yy',
  },
  investment: {
    type: 'money',
    label: 'Investment Amount',
    name: 'investment',
    tooltip: `This is the total cash investment amount for the round.`,
    placeholder: '$0.00',
  },
  discount: {
    type: 'percentage',
    label: 'Discount',
    name: 'discount',
    tooltip: `The Discount is applied to the price per share of the conversion round. Because Convertible Note and SAFE investors invest earlier than the conversion round, they typically receive a lower price per share, which gives them more shares for their investment. If the Discount is 20% and the conversion round share price is $5, the Convertible Note or SAFE converts at (1 - 20%) x $5 = $4 per share. Example: SAFE investors invest $500,000 at a discounted rate of 80%. One year later, a Series A is raised at $5 per share. The SAFE is converted into shares at 80% x $5 = $4 per share. This means the SAFE investors receive $500,000 / $4 per share = 125,000 shares.`,
    placeholder: '',
  },
  conversionCap: {
    type: 'money',
    label: 'Valuation Cap',
    name: 'conversionCap',
    tooltip: `The Valuation Cap (or "Conversion Cap") determines the maximum price per share that can be applied to convert a Convertible Note or SAFE. This helps to ensure that the Convertible Note or SAFE investors receive a reasonable amount of ownership, even if the value of the company increases more than expected. Shares are converted based on either the Discount or the Valuation Cap, whichever results in a lower price per share. Example: SAFE investors invest $500,000 at a discounted rate of 80%, with a valuation cap of $6,000,000. One year later, a Series A is raised at $5 per share at $10,000,000 pre-money valuation. The valuation cap divided by the pre-money value is $6,000,000 / $10,000,000 = 60%. Since this rate is lower than the discounted rate of 80%, we use the 60% rate. 60% x $5 per share = $3 per share.`,
    placeholder: '',
  },
  conversionRound: {
    type: 'option',
    label: 'Conversion Round',
    name: 'conversionRound',
    tooltip: `For a Convertible Note or SAFE investment, investors' shares are issued as part of a future priced round, or "Conversion Round". The valuation and terms of the Conversion Round (usually a Series A) will determine how many shares are issued to Convertible Note or SAFE investors.`,
    placeholder: '',
  },
};

const commonRound = {
  date: {
    type: 'date',
    label: 'Date',
    name: 'date',
    tooltip: `This is the month that the round will be closed or the shares will be issued.`,
    placeholder: 'mmmm yy',
  },
  investment: {
    type: 'money',
    label: 'Investment Amount',
    name: 'investment',
    tooltip: `This is the total cash investment amount for the round.`,
    placeholder: '$0.00',
  },
  preMoney: {
    type: 'money',
    label: 'Pre-Money Value',
    name: 'preMoney',
    tooltip: `This is the value of the company before raising equity, calculated as the price per share times the number of shares before investment. Example: Founders have 10,000,000 shares, and they issue 2,500,000 shares at $1 per share. Pre-money value is 10,000,000 x $1 = $10,000,000`,
    placeholder: '$0.00',
  },
  shares: {
    type: 'money',
    label: 'Shares',
    name: 'shares',
    tooltip: `This is the number of new shares issued in this round, which determines the ownership percent.`,
    placeholder: '$0.00',
  },
  unitShare: {
    type: 'percentage',
    label: 'Ownership',
    name: 'unitShare',
    tooltip: `Enter the percent ownership given to this round of investors. This is used to calculate the number of shares issued at this stage. The net ownership percent will decrease as additional shares are issued.`,
    placeholder: '',
  },
  unitPrice: {
    type: 'percentage',
    label: 'Price per Share',
    name: 'unitPrice',
    tooltip: `This is the investment amount divided by the number of shares received. Price per share normally increases with each round issued, unless the company experiences a "Down Round" which is a future financing at a lower value than a previous financing. The value of the company is the total number of shares times the price per share.`,
    placeholder: '',
  },
  postMoney: {
    type: 'money',
    label: 'Post-Money Value',
    name: 'postMoney',
    tooltip: `After raising capital, the value of the company increases by the amount raised. This is calculated as the price per share times the number of shares after investment. Example: Founders have 10,000,000 shares, and they issue 2,500,000 shares at $1 per share. Post-money value is 12,500,000 x $1 = $12,500,000. This can also be calculated as pre-money value plus investment amount.`,
    placeholder: '$0.00',
  },
};

const preferredRound = {
  date: {
    type: 'date',
    label: 'Date',
    name: 'date',
    tooltip: `This is the month that the round will be closed or the shares will be issued.`,
    placeholder: 'mmmm yy',
  },
  investment: {
    type: 'money',
    label: 'Investment Amount',
    name: 'investment',
    tooltip: `This is the total cash investment amount for the round.`,
    placeholder: '$0.00',
  },
  preMoney: {
    type: 'money',
    label: 'Pre-Money Value',
    name: 'preMoney',
    tooltip: `This is the value of the company before raising equity, calculated as the price per share times the number of shares before investment. Example: Founders have 10,000,000 shares, and they issue 2,500,000 shares at $1 per share. Pre-money value is 10,000,000 x $1 = $10,000,000`,
    placeholder: '$0.00',
  },
  annualDividend: {
    type: 'percentage',
    label: 'Annual Dividend',
    name: 'annualDividend',
    tooltip: `A dividend is a cash payment a company makes to its preferred shareholders at a negotiated annual percentage rate, such as 6% of the preferred equity invested. For most early stage companies, and for purposes of this model, the full value of the dividend is accumulated over the life of the investment and is paid out at an exit or liquidity event (see the Investor Return report). For example, a preferred dividend of 6% annually on a $10m Series B investment would be 6% x $10m = $600k per year.`,
    placeholder: '',
  },
  dividendType: {
    type: 'option',
    label: 'Dividend Type',
    name: 'dividendType',
    tooltip: `Dividends may accrue using either a simple or a compound calculation. For a simple dividend, the same amount is accrued each year. For a compound dividend, a dividend is owed on the unpaid, accrued dividends. For example, a cumulative simple annual dividend of 6% on a $10m Series B would accumulate at the rate of $600k each year, but a cumulative compound annual dividend of 6% on a $10m Series B would be $600k in the first year, but $636k in the second year (6% x ($10.0m investment + $0.6 of unpaid dividend)), and so forth.`,
    placeholder: '',
    condition: 'annualDividend',
  },
  liquidationPreference: {
    type: 'multiplier',
    label: 'Liquidation Preference',
    name: 'liquidationPreference',
    tooltip: `A Liquidation Preference is the multiple of the investment amount that is paid back to preferred investors before the rest of the cash is divided between shareholders. This can help ensure that later investors will receive a worthwhile return. If there is no liquidation preference, enter 0.`,
    placeholder: '',
  },
  participation: {
    type: 'option',
    label: 'Participation Preference',
    name: 'participation',
    tooltip: `Participating preferred shares receive both the value of their preference payments (such as dividends and liquidation preferences) AND the value of their share of the common proceeds once those preferred shares convert to common shares. Non-participating preferred shares receive either their preferences paid out OR the value of their shares converted to common shares, whichever is greater.`,
    placeholder: '',
  },
  antiDilution: {
    type: 'option',
    label: 'Anti Dilution',
    name: 'antiDilution',
    tooltip: `Anti-dilution protects investors from future "Down Rounds", where the valuation of the company decreases. In the case of a down round, an anti-dilution provision in the investment agreement grants new shares to the investors in the previous round. A "Full Ratchet" form of antidilution calculation grants shares as if the initial round had invested at the new (lower) value. A "Weighted Average" calculation grants shares as if the initial round had invested at a weighted average value between the previous round and the down round. This model applies the "Broad-Based" form of a weighted average calculation. For example, if an investor bought 1m shares at $2 each in a Series A, but later a Series B round was priced at $1 per share, then that Series A investor gets another 1m shares under a "Full Ratchet" clause, but gets only 500k additional shares under a "Weighted Average" clause. An antidilution provision can can significantly dilute the ownership of founders and common investors who do not have anti-dilution preferences in the event of a Down Round.`,
    placeholder: '',
  },
  shares: {
    type: 'money',
    label: 'Shares',
    name: 'shares',
    tooltip: `This is the number of new shares issued in this round, which determines the ownership percent.`,
    placeholder: '$0.00',
  },
  unitShare: {
    type: 'percentage',
    label: 'Ownership',
    name: 'unitShare',
    tooltip: `Enter the percent ownership given to this round of investors. This is used to calculate the number of shares issued at this stage. The net ownership percent will decrease as additional shares are issued.`,
    placeholder: '',
  },
  unitPrice: {
    type: 'money',
    label: 'Price per Share',
    name: 'unitPrice',
    tooltip: `This is the investment amount divided by the number of shares received. Price per share normally increases with each round issued, unless the company experiences a "Down Round" which is a future financing at a lower value than a previous financing. The value of the company is the total number of shares times the price per share.`,
    placeholder: '',
  },
  postMoney: {
    type: 'money',
    label: 'Post-Money Value',
    name: 'postMoney',
    tooltip: `After raising capital, the value of the company increases by the amount raised. This is calculated as the price per share times the number of shares after investment. Example: Founders have 10,000,000 shares, and they issue 2,500,000 shares at $1 per share. Post-money value is 12,500,000 x $1 = $12,500,000. This can also be calculated as pre-money value plus investment amount.`,
    placeholder: '$0.00',
  },
};

const issueOptionsWarrants = {
  date: {
    type: 'date',
    label: 'Date',
    name: 'date',
    tooltip: `This is the month that the round will be closed or the shares will be issued.`,
    placeholder: 'mmmm yy',
  },
  shares: {
    type: 'money',
    label: 'Shares',
    name: 'shares',
    tooltip: `This is the number of new shares issued in this round, which determines the ownership percent.`,
    placeholder: '$0.00',
  },
  unitShare: {
    type: 'percentage',
    label: 'Ownership',
    name: 'unitShare',
    tooltip: `Enter the percent ownership given to this round of investors. This is used to calculate the number of shares issued at this stage. The net ownership percent will decrease as additional shares are issued.`,
    placeholder: '',
  },
  exercisePrice: {
    type: 'money',
    label: 'Exercise Price (per Share)',
    name: 'exercisePrice',
    tooltip: `Options and Warrants are issued with a fixed "Exercise", or "Strike" price that must be paid to convert them into shares. For purposes of this model, shares are only exercised at an exit (see the Investor Return report). For example, if an employee was granted 25k shares of common stock at an exercise price of $1 per share in a company that eventually sold for $20 per share, their net value of each share of common stock would be $19 per share ($20 per share, less an exercise price of $1 per share) x 25k shares = $475k.`,
    placeholder: '',
  },
};

export const captableData = {
  founding,
  convertibleNote,
  safe,
  commonRound,
  preferredRound,
  issueOptionsWarrants,
};
