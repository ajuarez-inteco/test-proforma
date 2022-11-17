// import {
//   // itemCaptableFounding,
//   // itemCaptablePreferredRound,
//   // itemCaptableIssueOptionsWarrants,
//   // itemCaptableConvertibleNote,
//   // itemCaptableCommonRound,
//   // itemCaptableSafe,
// } from '../constants';

function getShareholders(uuid, items) {
  const item = items.find((i) => i.uuid === uuid);
  const values = {
    investmentRemaining: item.investment,
    sharesRemaining: item.shares,
  };
  return values;
}

function getNewShareHolder(item) {
  console.log(item);
  return 0;
}

export { getShareholders, getNewShareHolder };
