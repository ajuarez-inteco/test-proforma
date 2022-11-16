import {
  itemCaptableFounding,
  itemCaptablePreferredRound,
  itemCaptableIssueOptionsWarrants,
  itemCaptableConvertibleNote,
  itemCaptableCommonRound,
  itemCaptableSafe,
  AntiDilutionSharesKey,
  TermsTypeSecurity,
} from '../constants';
import { optionsConfig } from '../config/options.config';
import { isNumeric, toNumeric } from './basic.cals';

function getShareValues(item, capitalization) {
  const res = {
    hasAntiDilutionShares: false,
    hasValueConvertedShares: false,
    valueAntiDilutionShares: 0,
    valueConvertedShares: 0,
  };
  /* eslint-disable consistent-return */
  capitalization.forEach((c) => {
    if (c.uuid === item.uuid && c.series) {
      c.series.forEach((s) => {
        if (s.key !== AntiDilutionSharesKey
          && s.type !== itemCaptablePreferredRound && isNumeric(s.share)) {
          res.valueConvertedShares += c.shares;
        }
      });
      return 0;
    }
    if (c.series && c.series.length > 0) {
      c.series.forEach((s) => {
        if (s.key === AntiDilutionSharesKey && isNumeric(s.share)) {
          res.valueAntiDilutionShares += c.shares;
        }
      });
    }
  });
  res.hasAntiDilutionShares = res.valueAntiDilutionShares > 0;
  res.hasValueConvertedShares = res.valueConvertedShares > 0;
  return res;
}

function getOwnerShipSeries(uuid, capitalization) {
  const res = {
    investorsRound: 0,
    sharesConverted: 0,
  };
  const item = capitalization.find((c) => c.uuid === uuid);
  if (item.series) {
    item.series.forEach((s) => {
      if (s.key !== itemCaptablePreferredRound && isNumeric(s.share)) {
        res.sharesConverted += s.ownership;
      } else if (isNumeric(s.share)) {
        res.investorsRound += s.ownership;
      }
    });
  } else {
    res.investorsRound += item.ownership;
  }
  return res;
}

function getTermsFounding(item, capitalization) {
  const itemFounding = capitalization.find((c) => c.uuid === item.uuid);
  const values = [];
  values.push({
    key: 'sharesIssued',
    name: 'Shares Issued',
    value: item.shares,
  });
  values.push({
    key: 'ownership',
    name: 'Ownership',
    value: itemFounding.ownership,
  });
  return [
    {
      key: 'overall',
      name: 'Overall',
      values,
    },
  ];
}

function getTermsIssueOptionsWarrants(item) {
  const values = [];
  values.push({
    key: 'sharesIssued',
    name: 'Shares Issued',
    value: item.shares,
  });
  values.push({
    key: 'ownership',
    name: 'Fully diluted ownership at issuance',
    value: item.unitShare,
  });
  values.push({
    key: 'exercise',
    name: 'Exercise Price',
    value: item.exercisePrice,
  });
  return [
    {
      key: 'overall',
      name: 'Overall',
      values,
    },
  ];
}

function getTermsSafeOutstandingShares(capitalization, uuid) {
  let resOutstandingShares = 0;
  /* eslint-disable consistent-return */
  capitalization.forEach((c) => {
    if (c.uuid === uuid) {
      return 0;
    }
    if (c.series && c.series.length > 0) {
      c.series.forEach((s) => {
        if (s.key !== AntiDilutionSharesKey && isNumeric(s.share)) {
          resOutstandingShares += c.shares;
        }
      });
    } else if (isNumeric(c.shares)) {
      resOutstandingShares += c.shares;
    }
  });
  return resOutstandingShares;
}

function getTermsSafe(item, capitalization) {
  const itemFounding = capitalization.find((c) => c.type === itemCaptableFounding);
  const res = [];
  let values = [];
  values.push({
    key: 'outstandingShares',
    name: 'Outstanding Shares prior to this round',
    value: getTermsSafeOutstandingShares(capitalization, item.uuid),
  });
  res.push({
    key: 'overall',
    name: 'Overall',
    values,
  });
  values = [];
  values.push({
    key: 'founders',
    name: 'Founders',
    value: itemFounding.ownership,
  });
  values.push({
    key: 'investorsPreviousRounds',
    name: 'Investors in previous rounds',
    value: (100 - itemFounding.ownership),
  });
  values.push({
    key: 'total',
    name: 'Total',
    value: 100,
  });
  res.push({
    key: 'CurrentCaptable',
    name: 'Current Cap Table (fully diluted)',
    values,
  });
  values = [];
  values.push({
    key: 'principal',
    name: 'Principal',
    value: item.investment,
  });
  values.push({
    key: 'conversionDiscount',
    name: 'Conversion Discount',
    value: item.discount,
  });
  values.push({
    key: 'valuationCap',
    name: 'Valuation Cap',
    value: item.conversionCap,
  });
  res.push({
    key: 'SAFETerms',
    name: 'SAFE Terms',
    values,
  });
  return res;
}
function getTermsPreferredRound(item, capitalization) {
  const res = [];
  let values = [];
  const outstandingShares = getTermsSafeOutstandingShares(capitalization, item.uuid);
  let sellingRound = 0;
  let pricePerShare = 0;
  if (isNumeric(item.investment) && isNumeric(item.preMoney)) {
    const preMoney = toNumeric(item.preMoney);
    if (preMoney > 0) {
      sellingRound = (outstandingShares * item.investment) / item.preMoney;
      if (sellingRound > 0) {
        pricePerShare = item.investment / sellingRound;
      }
    }
  }
  const preMoneyValuation = outstandingShares * pricePerShare;
  const raising = sellingRound * pricePerShare;
  const preferredRoundOptions = optionsConfig.captable.preferredRound;

  values.push({
    key: 'outstandingShares',
    name: 'Outstanding Shares prior to this round',
    value: outstandingShares,
  });
  values.push({
    key: 'sellingRound',
    name: 'Selling in this round',
    value: sellingRound,
  });
  values.push({
    key: 'pricePerShare',
    name: 'Price per share',
    value: pricePerShare,
  });
  res.push({
    key: 'overall',
    name: 'Overall',
    values,
  });
  values = [];
  values.push({
    key: 'preMoneyValuation',
    name: 'Pre-money valuation',
    value: preMoneyValuation,
  });
  const {
    hasAntiDilutionShares,
    valueAntiDilutionShares,
    hasValueConvertedShares,
    valueConvertedShares,
  } = getShareValues(item, capitalization);
  if (hasAntiDilutionShares) {
    values.push({
      key: 'antidilutionPreviousRound',
      name: 'Anti-dilution for previous round',
      value: (valueAntiDilutionShares * pricePerShare),
    });
  }
  values.push({
    key: 'raising',
    name: 'Raising',
    value: raising,
  });
  if (hasValueConvertedShares) {
    values.push({
      key: 'valueConvertedShares',
      name: 'Value of converted shares',
      value: valueConvertedShares,
    });
  }
  values.push({
    key: 'postMoneyValuation',
    name: 'Post-money valuation',
    value: (preMoneyValuation + valueAntiDilutionShares + raising + valueConvertedShares),
  });
  res.push({
    key: 'valuation',
    name: 'Valuation',
    values,
  });
  values = [];
  values.push({
    key: 'typeSecurity',
    name: 'Type of Security',
    value: TermsTypeSecurity,
  });
  values.push({
    key: 'liquidationPreference',
    name: 'Liquidation Preference',
    value: item.liquidationPreference,
  });
  values.push({
    key: 'annualDividend',
    name: 'Annual Dividend',
    value: item.annualDividend,
  });
  values.push({
    key: 'dividendType',
    name: 'Dividend Type',
    value: preferredRoundOptions.dividendType[item.dividendType],
  });
  values.push({
    key: 'participationPreference',
    name: 'Participation Preference',
    value: preferredRoundOptions.participation[item.participation],
  });
  if (item.antiDilution !== 'none' && item.antiDilution !== '') {
    values.push({
      key: 'antiDilution',
      name: 'Anti Dilution',
      value: preferredRoundOptions.antiDilution[item.antiDilution],
    });
  }
  res.push({
    key: 'descriptionSecurity',
    name: 'Description of the Security',
    values,
  });
  values = [];
  const itemFounding = capitalization.find((c) => c.type === itemCaptableFounding);
  const { investorsRound, sharesConverted } = getOwnerShipSeries(item.uuid, capitalization);
  values.push({
    key: 'founders',
    name: 'Founders',
    value: itemFounding.ownership,
  });
  values.push({
    key: 'investorsPreviousRounds',
    name: 'Investors in previous rounds',
    value: (100 - (itemFounding.ownership + investorsRound + sharesConverted)),
  });
  values.push({
    key: 'investorsRound',
    name: 'Investors in this round',
    value: investorsRound,
  });
  if (sharesConverted > 0) {
    values.push({
      key: 'sharesConverted',
      name: 'Shares converted this round',
      value: sharesConverted,
    });
  }
  values.push({
    key: 'total',
    name: 'Total',
    value: 100,
  });
  res.push({
    key: 'ownershipPostRaise',
    name: 'Ownership post-raise (fully diluted)',
    values,
  });
  return res;
}

function getTerms(items, capitalization) {
  const table = [];
  items.forEach((item) => {
    if (item.type === itemCaptableFounding) {
      table.push({
        uuid: item.uuid,
        name: item.name,
        color: item.color,
        type: item.type,
        values: getTermsFounding(item, capitalization),
      });
    }
    if (item.type === itemCaptableSafe) {
      table.push({
        uuid: item.uuid,
        name: item.name,
        color: item.color,
        type: item.type,
        values: getTermsSafe(item, capitalization),
      });
    }
    if (item.type === itemCaptableConvertibleNote) {
      table.push({
        uuid: item.uuid,
        name: item.name,
        color: item.color,
        type: item.type,
        values: getTermsSafe(item, capitalization),
      });
    }
    if (item.type === itemCaptableCommonRound) {
      table.push({
        uuid: item.uuid,
        name: item.name,
        color: item.color,
        type: item.type,
        values: getTermsPreferredRound(item, capitalization),
      });
    }
    if (item.type === itemCaptablePreferredRound) {
      table.push({
        uuid: item.uuid,
        name: item.name,
        color: item.color,
        type: item.type,
        values: getTermsPreferredRound(item, capitalization),
      });
    }
    if (item.type === itemCaptableIssueOptionsWarrants) {
      table.push({
        uuid: item.uuid,
        name: item.name,
        color: item.color,
        type: item.type,
        values: getTermsIssueOptionsWarrants(item, capitalization),
      });
    }
  });
  return {
    table,
  };
}

export { getTerms };
