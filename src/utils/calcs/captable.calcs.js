import { v4 as uuidv4 } from 'uuid';
import {
  format, getYear, addMonths,
} from 'date-fns';
import { captableValues } from '../data/captable.values';
import {
  itemCaptableFounding,
  itemCaptablePreferredRound,
  listColor,
  formatDate,
  startLetterpreferedRound,
  itemCaptableIssueOptionsWarrants,
  itemCaptableConvertibleNote,
  itemCaptableCommonRound,
  itemCaptableSafe,
} from '../constants';
import { captableLocalStorage } from '../../storage/local';
import { getCapitalization } from './captableCapitalization.calcs';
import { getInvestorReturn } from './captableInvestorReturn.calcs';
import { getTerms } from './captableTerms.calcs';
import { getShareholders } from './captableShareholders.calcs';

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

function nextColor(uuid) {
  const i = captableLocalStorage.countAll(uuid);
  let index = 0;
  if (i < listColor.length) {
    index = i;
  } else {
    const p = parseInt(i / listColor.length, 10);
    const pr = p * listColor.length;
    index = i - pr;
  }
  return listColor[index];
}

function getNewItemDate(lastItem) {
  if (lastItem.type === itemCaptableFounding) {
    const year = getYear(new Date()) + 1;
    return format(new Date(year, 0, 1), formatDate);
  }
  const date = new Date(lastItem.date);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return format(
    addMonths(new Date(date.getTime() + userTimezoneOffset), 18),
    formatDate,
  );
}

function getNewItemInvesment(type, items) {
  if (
    type === itemCaptableFounding
    || type === itemCaptableIssueOptionsWarrants
  ) {
    return 0;
  }
  if (
    type === itemCaptableCommonRound
    || type === itemCaptableConvertibleNote
    || type === itemCaptableSafe
  ) {
    return 500000;
  }
  if (type === itemCaptablePreferredRound) {
    return 1000000;
  }
  const hasPreferredRound = items.some(
    ({ typePR }) => typePR === itemCaptablePreferredRound,
  );
  if (!hasPreferredRound) {
    return 10000000;
  }
  return 0;
}

function calcPreRaiseShares(values) {
  const rounds = JSON.parse(JSON.stringify(values));
  const lastRound = rounds.reverse()
    .find(
      (element) => element.type === 'commonRound'
      || element.type === 'preferredRound'
      || element.type === 'founding',
    );

  return lastRound.type === 'founding'
    ? lastRound.shares : lastRound.postRaiseShares;
}

function calcPostRaiseShares(newData, values, valueCapitalization) {
  let postRaiseShares = newData.preRaiseShares + newData.shares;
  if (values.some((round) => round.type === 'convertibleNote'
    || round.type === 'safeNote') && valueCapitalization.series) {
    for (let i = 0; i < valueCapitalization.length; i += 1) {
      const round = valueCapitalization[i];
      if (round.type === 'convertibleNote'
        || round.type === 'safeNote'
        || (round.key && round.key === 'AntiDilutionShares'
        && round.type === 'prefferedRound')) {
        postRaiseShares += round.shares;
      }
    }
  }
  return postRaiseShares;
}

function defaultCalcs(data, values, valueCapitalization) {
  const newData = {};
  newData.preMoney = data.preMoney;
  newData.unitPrice = data.unitPrice;
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.postMoney = data.preMoney + data.investment;
  newData.shares = data.investment / data.unitPrice;
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.unitShare = ((newData.shares / newData.simplePostRaiseShares) * 100).toFixed(2);
  newData.postRaiseShares = calcPostRaiseShares(newData, values, valueCapitalization);
  console.log('default new data', newData);
  return newData;
}

function sharesCalcs(data, values, valueCapitalization) {
  const newData = {};
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.simplePostRaiseShares = newData.preRaiseShares + data.shares;
  newData.unitShare = ((data.shares / newData.simplePostRaiseShares) * 100).toFixed(2);
  newData.unitPrice = data.investment / data.shares;
  newData.preMoney = newData.unitPrice * newData.preRaiseShares;
  newData.postMoney = newData.preMoney + data.investment;
  newData.postRaiseShares = newData.preRaiseShares + data.shares;

  if (values.some((round) => round.type === 'convertibleNote'
    || round.type === 'safeNote') && valueCapitalization.series) {
    for (let i = 0; i < valueCapitalization.length; i += 1) {
      const round = valueCapitalization[i];
      if (round.type === 'convertibleNote'
        || round.type === 'safeNote'
        || (round.key && round.key === 'AntiDilutionShares'
        && round.type === 'prefferedRound')) {
        newData.postRaiseShares += round.shares;
      }
    }
  }
  console.log('shareCalc new data', newData);
  return newData;
}

function ownershipCalcs(data, values, valueCapitalization) {
  const newData = {};
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.shares = (newData.preRaiseShares * (data.unitShare / 100)) / (1 - (data.unitShare / 100));
  newData.unitPrice = data.investment / newData.shares;
  newData.preMoney = newData.unitPrice * newData.preRaiseShares;
  newData.postMoney = newData.preMoney + data.investment;
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.postRaiseShares = newData.preRaiseShares + newData.shares;
  if (values.some((round) => round.type === 'convertibleNote'
    || round.type === 'safeNote') && valueCapitalization.series) {
    for (let i = 0; i < valueCapitalization.length; i += 1) {
      const round = valueCapitalization[i];
      if (round.type === 'convertibleNote'
        || round.type === 'safeNote'
        || (round.key && round.key === 'AntiDilutionShares'
        && round.type === 'prefferedRound')) {
        newData.postRaiseShares += round.shares;
      }
    }
  }
  console.log('ownership New data', newData);
  return newData;
}

function unitPriceCalcs(data, values, valueCapitalization) {
  const newData = {};
  newData.unitPrice = data.unitPrice;
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.shares = (data.investment / data.unitPrice);
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.unitShare = ((newData.shares / newData.simplePostRaiseShares) * 100).toFixed(2);
  newData.preMoney = data.unitPrice * newData.preRaiseShares;
  newData.postMoney = newData.preMoney + data.investment;
  newData.postRaiseShares = newData.preRaiseShares + newData.shares;
  if (values.some((round) => round.type === 'convertibleNote'
    || round.type === 'safeNote') && valueCapitalization.series) {
    for (let i = 0; i < valueCapitalization.length; i += 1) {
      const round = valueCapitalization[i];
      if (round.type === 'convertibleNote'
        || round.type === 'safeNote'
        || (round.key && round.key === 'AntiDilutionShares'
        && round.type === 'prefferedRound')) {
        newData.postRaiseShares += round.shares;
      }
    }
  }
  console.log('unitprice calc newdata', newData);
  return newData;
}

function preMoneyCalcs(data, values, valueCapitalization) {
  const newData = {};
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.unitPrice = data.preMoney / newData.preRaiseShares;
  newData.postMoney = data.preMoney + data.investment;
  newData.shares = data.investment / newData.unitPrice;
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.unitShare = ((newData.shares / newData.simplePostRaiseShares) * 100).toFixed(2);
  newData.postRaiseShares = newData.preRaiseShares + newData.shares;
  if (values.some((round) => round.type === 'convertibleNote'
    || round.type === 'safeNote') && valueCapitalization.series) {
    for (let i = 0; i < valueCapitalization.length; i += 1) {
      const round = valueCapitalization[i];
      if (round.type === 'convertibleNote'
        || round.type === 'safeNote'
        || (round.key && round.key === 'AntiDilutionShares'
        && round.type === 'prefferedRound')) {
        newData.postRaiseShares += round.shares;
      }
    }
  }
  console.log('preMoney calc newdata', newData);
  return newData;
}

function optionsDefaultCalcs(data, values) {
  const newData = {};
  newData.shares = data.shares;
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.unitShare = ((newData.shares / newData.simplePostRaiseShares) * 100).toFixed(2);
  console.log('options default calcs', newData);
  return newData;
}

function optionsUnitShareCalcs(data, values) {
  const newData = {};
  newData.unitShare = data.unitShare;
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.shares = (newData.preRaiseShares * (newData.unitShare / 100))
    / (1 - (newData.unitShare / 100));
  console.log('options default calcs', newData);
  return newData;
}

function postMoneyCalcs(data, values, valueCapitalization) {
  const newData = {};
  newData.preRaiseShares = calcPreRaiseShares(values);
  newData.preMoney = data.postMoney - data.investment;
  newData.unitPrice = newData.preMoney / newData.preRaiseShares;
  // newData.postMoney = newData.preMoney + data.investment;
  newData.shares = data.investment / newData.unitPrice;
  newData.simplePostRaiseShares = newData.preRaiseShares + newData.shares;
  newData.unitShare = newData.shares / newData.simplePostRaiseShares;
  newData.postRaiseShares = newData.preRaiseShares + newData.shares;
  if (values.some((round) => round.type === 'convertibleNote'
    || round.type === 'safeNote') && valueCapitalization.series) {
    for (let i = 0; i < valueCapitalization.length; i += 1) {
      const round = valueCapitalization[i];
      if (round.type === 'convertibleNote'
        || round.type === 'safeNote'
        || (round.key && round.key === 'AntiDilutionShares'
        && round.type === 'prefferedRound')) {
        newData.postRaiseShares += round.shares;
      }
    }
  }
  console.log('postMoney calc newdata', newData);
  return newData;
}

function stepCalcs(uuidModel, uuid, capitalization, key) {
  const valuesTmp = captableLocalStorage.getAll(uuidModel);
  const index = valuesTmp.findIndex((v) => v.uuid === uuid);
  const value = valuesTmp[index];
  const values = captableLocalStorage.getToIndex(uuidModel, index);
  const valueCapitalization = capitalization.find((v) => v.uuid === uuid);
  const res = {
    change: false,
    item: {},
  };
  if (value.type === itemCaptablePreferredRound || value.type === itemCaptableCommonRound) {
    // console.log('key');
    // console.log(key);
    switch (key) {
      case 'shares':
        res.item = sharesCalcs(value, values, valueCapitalization);
        break;
      case 'unitShare':
        res.item = ownershipCalcs(value, values, valueCapitalization);
        break;
      case 'unitPrice':
        res.item = unitPriceCalcs(value, values, valueCapitalization);
        break;
      case 'preMoney':
        res.item = preMoneyCalcs(value, values, valueCapitalization);
        break;
      case 'postMoney':
        res.item = postMoneyCalcs(value, values, valueCapitalization);
        break;
      default:
        res.change = true;
        res.item = defaultCalcs(value, values, valueCapitalization);
    }
  }
  if (value.type === itemCaptableIssueOptionsWarrants) {
    if (key === 'unitShare') res.item = optionsUnitShareCalcs(value, values, valueCapitalization);
    else {
      res.item = optionsDefaultCalcs(value, values, valueCapitalization);
    }
  }
  return res;
}

function getNewItem(uuid, type, itemsChange) {
  const items = captableLocalStorage.getAll(uuid);
  const defaultData = JSON.parse(JSON.stringify(captableValues[type]));
  defaultData.uuid = uuidv4();
  defaultData.type = type;
  defaultData.name = defaultData.prefixName;
  if (type !== itemCaptableFounding) {
    const itemsByType = captableLocalStorage.getByType(uuid, type);
    if (type === itemCaptablePreferredRound) {
      const l = itemsByType.length === 0
        ? startLetterpreferedRound
        : itemsByType[itemsByType.length - 1].name.slice(-1);
      const nl = itemsByType.length === 0 ? l : nextChar(l);
      defaultData.name = `${defaultData.prefixName} ${nl}`;
    } else {
      defaultData.name = `${defaultData.prefixName} ${
        itemsByType.length === 0 ? '' : itemsByType.length + 1
      }`;
    }
  }
  const itemsB = JSON.parse(JSON.stringify(items));
  defaultData.color = nextColor(uuid);
  defaultData.date = getNewItemDate(
    itemsB.length < 1 ? defaultData : itemsB.pop(),
  );
  defaultData.investment = getNewItemInvesment(type, items);
  if (type === itemCaptablePreferredRound) {
    const itemsToChange = items.filter(
      (item) => (item.type === itemCaptableConvertibleNote
          || item.type === itemCaptableSafe)
          && item.conversionRound === '',
    );
    itemsChange(itemsToChange, defaultData.uuid);
  }
  return defaultData;
}

function calculations(uuid, uuidItem) {
  const res = {};
  // Data filter
  let values = captableLocalStorage.getAll(uuid);
  if (uuidItem !== '') {
    const index = values.findIndex((v) => v.uuid === uuidItem) + 1;
    values = captableLocalStorage.getToIndex(uuid, index);
  }
  const uuidItemSelected = uuidItem !== '' ? uuidItem : values[values.length - 1].uuid;

  // ----- Capitalizacion
  const capitalization = getCapitalization(values);
  res.capitalization = capitalization;

  // ----- TERMS
  const valueTerm = values.find((v) => v.uuid === uuidItemSelected);
  const valuesTerms = [valueTerm];

  const terms = getTerms(valuesTerms, capitalization.table);
  res.terms = terms;

  // ----- INVESTOR RETURN
  res.investorReturn = getInvestorReturn(values, capitalization.table);

  // ----- ShareHolder
  res.shareholders = getShareholders(uuidItemSelected, values);
  res.selectItemUuid = uuidItemSelected;
  return res;
}

export const capTableCalcs = {
  getNewItem,
  calculations,
  stepCalcs,
};
