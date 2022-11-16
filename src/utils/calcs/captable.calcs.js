import { v4 as uuidv4 } from 'uuid';
import { format, getYear, addMonths } from 'date-fns';
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

function defaultCalcs(data, rounds) {
  const r = JSON.parse(JSON.stringify(rounds));
  const lastRound = r
    .reverse()
    .find(
      (element) => element.type === 'commonRound'
      || element.type === 'preferredRound'
      || element.type === 'founding',
    );

  data.preRaiseShares = lastRound.type === 'founding'
    ? lastRound.shares : lastRound.PostRaiseShares;
  data.postMoney = data.preMoney + data.investment;
  data.shares = data.investment / data.unitShare;
  data.simplePostRaiseShares = data.preRaiseShares + data.shares;
  data.ownership = data.shares / data.simplePostRaiseShares;
  // data.postRaiseShares = data.preRaiseShares + data.shares +
  return data;
}

function getNewItem(uuid, type, itemsChange) {
  const items = captableLocalStorage.getAll(uuid);
  let defaultData = JSON.parse(JSON.stringify(captableValues[type]));
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
    defaultData = defaultCalcs(defaultData, items);
  }
  console.log(type);
  if (type === itemCaptableCommonRound) {
    defaultData = defaultCalcs(defaultData, items);
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
};
