import {
  itemCaptableFounding,
  itemCaptablePreferredRound,
  itemCaptableIssueOptionsWarrants,
  itemCaptableConvertibleNote,
  itemCaptableCommonRound,
  itemCaptableSafe,
  AntiDilutionSharesKey,
  CaptableFlullRatchetOptionKey,
  DiscountKey,
} from '../constants';
import { isNumeric, toNumeric } from './basic.cals';

function getCapitalizationIssueOptionsWarrants(item) {
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    shares: toNumeric(item.shares),
  };
}

function getSumSharesToInde(index, table) {
  let totalShares = 0;
  const tableToIndex = table.filter((t, i) => i <= index);
  tableToIndex.forEach((tti) => {
    if (tti.type !== itemCaptablePreferredRound && isNumeric(tti.shares)) {
      totalShares += tti.shares;
    } else if (tti.series.length > 0) {
      tti.series.forEach((s) => {
        if (s.key === itemCaptableSafe || s.key === itemCaptableConvertibleNote) {
          totalShares += tti.shares;
        }
      });
    }
  });
  return totalShares;
}

function getAntidutiosSeries(item, currentItem, index, table) {
  const resItem = {
    uuid: item.uuid,
    name: 'Anti-Dilution Shares',
    color: item.color,
    type: item.type,
    investment: item.investment,
    key: AntiDilutionSharesKey,
  };

  /**
   * =SI(
   *  B21="None";
   *  0;
   *  SUMA(F7:F9)* sumSafeDiscountCurrent
   *  ( resAntidulution
   *    (E7/F7)*1/ resSafeCurrent
   *    SI( resAntidulutiondiv
   *      B21="Full Ratchet";
   *      E11/F11; fullRatchetValue
   *      (E7/F7)*(
   *        SUMA(F5;F7;F8;F9)+E11/(E7/F7)
   *      ) resWeightedAverage /(
   *        SUMA(F5;F7;F8;F9)+F11
   *      )
   *    )-1
   *  )
   * )
   */
  let sumSafeDiscountCurrent = 0;
  let resSafeCurrent = 0;
  let resAntidulution = 0;
  let resAntidulutiontotal = 0;
  currentItem.series.forEach((s) => {
    if (s.type === itemCaptablePreferredRound && isNumeric(s.shares)) {
      sumSafeDiscountCurrent += s.shares;
      if (isNumeric(s.investment) && s.shares > 0) {
        resSafeCurrent = (s.investment / s.shares) * 1;
      }
    }
    if (s.type === itemCaptableSafe && s.key === DiscountKey && isNumeric(s.shares)) {
      sumSafeDiscountCurrent += s.shares;
    }
  });
  if (item.antiDilution === CaptableFlullRatchetOptionKey && table.length > (index + 1)) {
    const nextItem = table[index + 1];
    if (isNumeric(nextItem.shares) && isNumeric(nextItem.investment) && nextItem.shares > 0) {
      resAntidulutiontotal = (nextItem.investment / nextItem.shares) * 1;
    }
  } else if (resSafeCurrent > 0 && table.length > (index + 1)) {
    const nextItem = table[index + 1];
    const sumCurrentShares = getSumSharesToInde(index, table);
    const resWeightedAverageInvestmen = (sumCurrentShares + nextItem.investment) / resSafeCurrent;
    const resWeightedAverageShare = (sumCurrentShares * nextItem.shares);
    if (resWeightedAverageShare > 0) {
      resAntidulutiontotal = (resSafeCurrent * resWeightedAverageInvestmen)
      / resWeightedAverageShare;
    }
  }
  if (resAntidulutiontotal > 0) {
    resAntidulution = resSafeCurrent / resAntidulutiontotal;
  }
  resItem.shares = sumSafeDiscountCurrent * resAntidulution;
  return resItem;
}

function getCapitalizationPreferredRound(item, sharesFounding) {
  const resItem = {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    investment: item.investment,
  };
  if (
    isNumeric(sharesFounding)
    && isNumeric(item.investment)
    && isNumeric(item.preMoney)
  ) {
    resItem.shares = (toNumeric(item.investment) / toNumeric(item.preMoney))
    * toNumeric(sharesFounding);
  }
  return resItem;
}

function getCapitalizationCommonRound(item, sharesFounding) {
  return getCapitalizationPreferredRound(item, sharesFounding);
}

function getCapitalizationSafe(item, itemPreferredRound) {
  const resItem = {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    investment: item.investment,
  };
  if (
    isNumeric(item.investment)
    && isNumeric(itemPreferredRound.investment)
    && isNumeric(itemPreferredRound.shares)
  ) {
    resItem.shares = (item.investment * itemPreferredRound.shares)
    / itemPreferredRound.investment;
  }
  return resItem;
}

function getCapitalizationSafeDiscount(item, itemSafe) {
  const resItem = {
    uuid: item.uuid,
    name: `${item.name} Discount`,
    color: item.color,
    type: item.type,
    key: DiscountKey,
  };
  if (isNumeric(itemSafe.shares)) {
    const discount = (item.discount / 100);
    resItem.shares = (itemSafe.shares * discount) / (1 - discount);
  }
  return resItem;
}

function getCapitalizationConvertibleNote(item, itemPreferredRound) {
  return getCapitalizationSafe(item, itemPreferredRound);
}

function getCapitalizationConvertibleNoteDiscount(item, itemSafe) {
  return getCapitalizationSafeDiscount(item, itemSafe);
}

function getCapitalizationFounding(item) {
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    shares: item.shares,
  };
}

function getCapitalizationPreferredRoundSimple(item, table, sharesFounding) {
  const resItem = {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    investment: item.investment,
  };
  if (isNumeric(item.preMoney) && isNumeric(item.investment)) {
    const tablePreferences = table.filter(
      (t) => t.type === itemCaptablePreferredRound && t.series && t.series.length > 0,
    );
    const restotal = tablePreferences.reduce((total, tp) => {
      return total + tp.series.reduce((t, tps) => t + tps.shares, 0);
    }, 0);
    resItem.shares = (item.investment / item.preMoney) * (restotal + sharesFounding);
  }
  return resItem;
}

function getCapitalizationPreferredRoundComplete(
  item,
  itemsSeries,
  itemPreferredRound,
) {
  const series = [];
  const seriesUUID = [];
  const resPR = getCapitalizationPreferredRound(item, itemPreferredRound);
  series.push(resPR);
  itemsSeries.forEach((is) => {
    if (is.type === itemCaptableSafe) {
      const resSafe = getCapitalizationSafe(is, resPR);
      series.push(resSafe);
      seriesUUID.push(is.uuid);
      if (isNumeric(is.discount)) {
        const resSafeDiscount = getCapitalizationSafeDiscount(is, resSafe);
        series.push(resSafeDiscount);
      }
    }
    if (is.type === itemCaptableConvertibleNote) {
      const resSafe = getCapitalizationConvertibleNote(is, resPR);
      series.push(resSafe);
      seriesUUID.push(is.uuid);
      if (isNumeric(is.discount)) {
        const resSafeDiscount = getCapitalizationConvertibleNoteDiscount(
          is,
          resSafe,
        );
        series.push(resSafeDiscount);
      }
    }
  });
  const investment = series.reduce((total, s) => {
    return total + (!s.investment ? 0 : s.investment);
  }, 0);
  const shares = series.reduce((total, s) => {
    return total + (!s.shares ? 0 : s.shares);
  }, 0);
  return {
    uuid: item.uuid,
    name: item.name,
    color: item.color,
    type: item.type,
    investment,
    shares,
    series,
    seriesUUID,
  };
}

function getCapitalization(items) {
  const totals = {
    investment: 0,
    shares: 0,
    ownership: 0,
    ownershipDiluted: 0,
  };
  const table = [];
  let sharesFounding = 0;
  items.forEach((item) => {
    if (item.type === itemCaptableFounding) {
      const res = getCapitalizationFounding(item);
      table.push(res);
      sharesFounding = item.shares;
    }
    if (item.type === itemCaptablePreferredRound) {
      const itemsSeries = items.filter((i) => i.conversionRound === item.uuid);
      if (itemsSeries.length === 0) {
        const res = getCapitalizationPreferredRoundSimple(item, table, sharesFounding);
        table.push(res);
      } else {
        const res = getCapitalizationPreferredRoundComplete(
          item,
          itemsSeries,
          sharesFounding,
        );
        table.push(res);
      }
    }
    if (item.type === itemCaptableCommonRound) {
      const res = getCapitalizationCommonRound(
        item,
        sharesFounding,
      );
      table.push(res);
    }
    if (item.type === itemCaptableIssueOptionsWarrants) {
      const res = getCapitalizationIssueOptionsWarrants(item);
      table.push(res);
    }
  });
  table.forEach((t, index) => {
    if (t.type === itemCaptablePreferredRound && t.series && t.series.length > 0) {
      const item = items.find((i) => i.uuid === t.uuid);
      if (item.antiDilution !== 'none') {
        t.series.push(getAntidutiosSeries(item, t, index, table));
      }
    }
  });

  totals.shares = table.reduce((total, item) => {
    return total + (!item.shares ? 0 : item.shares);
  }, 0);

  totals.investment = table.reduce((total, item) => {
    return total + (!isNumeric(item.investment) ? 0 : toNumeric(item.investment));
  }, 0);

  const totalsSharesOptions = table.reduce((total, item) => {
    if (item.type === itemCaptableIssueOptionsWarrants) {
      return total + !item.shares ? 0 : item.shares;
    }
    return total;
  }, 0);

  // console.log(totalsSharesOptions);

  table.forEach((t) => {
    if (isNumeric(totals.shares) && isNumeric(t.shares)) {
      t.ownershipDiluted = (t.shares / totals.shares) * 100;
      if (t.type !== itemCaptableIssueOptionsWarrants) {
        t.ownership = (t.shares / (totals.shares - totalsSharesOptions)) * 100;
      }
      if (!!t.series && t.series.length > 0) {
        t.series.forEach((s) => {
          if (isNumeric(s.shares)) {
            s.ownershipDiluted = (s.shares / totals.shares) * 100;
            s.ownership = (s.shares / (totals.shares - totalsSharesOptions)) * 100;
          }
        });
      }
    }
  });
  totals.ownership = table.reduce((total, item) => {
    return total + (!item.ownership ? 0 : item.ownership);
  }, 0);
  totals.ownershipDiluted = table.reduce((total, item) => {
    return total + (!item.ownershipDiluted ? 0 : item.ownershipDiluted);
  }, 0);
  return {
    totals,
    table,
  };
}

export { getCapitalization };
