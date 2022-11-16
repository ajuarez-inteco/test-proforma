export const captable = [
  {
    name: 'Convertible Note',
    key: 'convertibleNote',
    description: 'Debt that converts into shares at a future round',
    tooltip: `In a priced common round, investors purchase ownership (shares) at a negotiated fixed price. The company receives seed capital, and the investors receive common shares in the company. The pre-money valuation determines how much ownership investors receive. Common shares entitle an investor to a portion of common proceeds, but this can be diluted both by the issuance of new shares and by “preferences” given to investors in a Preferred Round. Common Rounds are raised before Preferred Rounds but are paid out later in a liquidity event. Common shares may include shareholder rights such as financial reporting and voting rights.`,
  },
  {
    name: 'SAFE',
    key: 'safe',
    description: 'Simple Agreement for Future Equity at a future round',
    tooltip: `A Convertible Note is a form of debt that converts into equity when a future round of equity is raised, usually a Series A. A convertible note's share price and valuation will be determined by the terms of the future conversion round. Interest on the note is typically paid in additional shares. This is known as "PIK" or Paid in Kind interest. Example: Convertible Note investors invest $500,000 with a discount of 20%, with an interest rate of 5% paid in shares. One year later, a Series A is raised at $5 per share. The Note is converted into shares at (1 - 20%) x $5 = $4 per share. This means the Convertible Note investors receive $500,000 / $4 per share = 125,000 shares, plus 5% interest * $500,000 / $4 per share = 6,250 interest shares. In the event that the Valuation Cap gives the Convertible Note investors a lower valuation, then that is the price of the shares. Convertible Note investors always get the lowest price per share based upon both methods of valuation of the Discount and the Valuation Cap.`,
  },
  {
    name: 'Common Round',
    key: 'commonRound',
    description: '"Common" shares for early investors',
    tooltip: `In a priced common round, investors purchase ownership (shares) at a negotiated fixed price. The company receives seed capital, and the investors receive common shares in the company. The pre-money valuation determines how much ownership investors receive. Common shares entitle an investor to a portion of common proceeds, but this can be diluted both by the issuance of new shares and by “preferences” given to investors in a Preferred Round. Common Rounds are raised before Preferred Rounds but are paid out later in a liquidity event. Common shares may include shareholder rights such as financial reporting and voting rights.`,
  },
  {
    name: 'Preferred Round',
    key: 'preferredRound',
    description: 'Shares with preferences for an established startup',
    tooltip: `In a Preferred Round (usually a Preferred Series A, B, C, etc.), the company issues Preferred Shares. Preferred Rounds are financing rounds after the initial seed funding. Because Preferred Round investors are buying in at a higher valuation, they are incentivized through preferences such as dividends, liquidation preferences, or anti-dilution rights. If the security in a Preferred Round is "Participating", the investors will receive a portion of the common proceeds in addition to their preferences.`,
  },
  {
    name: 'Issue Options/Warrants',
    key: 'issueOptionsWarrants',
    description: 'Upside for employees and contributors',
    tooltip: `Options give their holders the right to purchase stock at a given Exercise Price (or "Strike Price"). They are often granted to employees and other contributors in exchange for their services. For the purposes of this model, options are not exercised (converted to shares) until a liquidity event. Example: An employee is granted 100,000 shares with an Exercise Price of $1.00/share. Upon a liquidaiton event that values the company at $10.00/share, the employee receives a "Cashless Exercise" of $9.00/share ($10.00/share Exit Value, less the Exercise Price of $1.00/share).`,
  },
];

export const revenue = [
  {
    name: 'Suscription',
    key: 'suscription',
    description: 'Forecast the number of new subcriptions started',
    tooltip: '',
  },
  {
    name: 'Unit Sales',
    key: 'unitSales',
    description: 'Forecast the total number of units sold',
    tooltip: '',
  },
];
