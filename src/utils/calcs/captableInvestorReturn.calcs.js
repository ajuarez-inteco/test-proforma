import {
  itemCaptableFounding,
  itemCaptablePreferredRound,
  itemCaptableIssueOptionsWarrants,
  CaptableCompoundOptionKey,
} from '../constants';
import { isNumeric } from './basic.cals';

function getCoreData(item, capitalization, totalPayoutAmount) {
  const resCore = {
    uuid: item.uuid,
    impliedPreference: 0,
    impliedCommon: 0,
  };
  const currentItem = capitalization.find((c) => c.uuid === item.uuid);

  const investment = isNumeric(item.investment) ? item.investment : 0;
  const liquidationPreference = isNumeric(item.liquidationPreference)
    ? item.liquidationPreference
    : 0;
  const currentValueInvestShares = isNumeric(currentItem.shares)
    && isNumeric(currentItem.investment)
    && currentItem.shares > 0
    ? currentItem.investment / currentItem.shares
    : 0;
  let valuedividentType = 0;
  if (item.dividendType === CaptableCompoundOptionKey) {
    const annualDividend = item.annualDividend + 1;
    const dateDays = (0) - 1;
    valuedividentType = annualDividend ** dateDays;
  } else {
    const dateDays = (0);
    valuedividentType = item.annualDividend ** dateDays;
  }
  resCore.impliedPreference = (investment * liquidationPreference)
  + (currentValueInvestShares * (valuedividentType));
  resCore.impliedCommon = totalPayoutAmount * currentItem.ownership;
  return resCore;
}

function getInvestorReturnPreferredRound(item) {
  console.log(item);
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    dividends: '',
    liquidationPreference: '',
  };
}

function getInvestorReturnPreferredRoundComplement(item, capitalization) {
  console.log(capitalization);
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    commonProceeds: '',
    netProceeds: '',
    proceeds: '',
    ownership: '',
    returnMultiple: '',
    IRR: '',
  };
}
function getInvestorReturnIssueOptionsWarrants(item) {
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    commonProceeds: '',
    exercisePrice: '',
    netProceeds: '',
    proceeds: '',
    ownership: '',
  };
}

function getInvestorReturnFounding(item) {
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    commonProceeds: '',
    exercisePrice: '',
    netProceeds: '',
    proceeds: '',
    ownership: '',
  };
}

function getInvestorReturn(itemsValues, capitalization) {
  const items = JSON.parse(JSON.stringify(itemsValues));
  const values = {
    exerciseProceeds: 0,
  };
  const table = [];
  const coreData = [];
  const itemsPR = items
    .reverse()
    .filter((i) => i.type === itemCaptablePreferredRound);

  itemsPR.forEach((ipr) => {
    coreData.push(getCoreData(ipr, capitalization, 0));
  });
  itemsPR.forEach((ipr) => {
    table.push(getInvestorReturnPreferredRound(ipr, table));
  });
  itemsPR.forEach((ipr) => {
    table.push(getInvestorReturnPreferredRoundComplement(ipr, capitalization));
  });
  items
    .filter((i) => i.type === itemCaptableIssueOptionsWarrants)
    .forEach((iiow) => {
      table.push(getInvestorReturnIssueOptionsWarrants(iiow));
    });
  items
    .filter((i) => i.type === itemCaptableFounding)
    .forEach((iiow) => {
      table.push(getInvestorReturnFounding(iiow));
    });
  return {
    values,
    table,
  };
}

function getTotalPayableAmount(values) {
  console.log(values);
  const totalPayoutAmount = 0;
  return { totalPayoutAmount };
}

export { getInvestorReturn, getTotalPayableAmount };
