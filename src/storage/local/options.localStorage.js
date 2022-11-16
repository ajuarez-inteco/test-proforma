import { optionsPreferredRound } from '../../utils/constants';

function getOptionsPreferredRound() {
  const data = JSON.parse(localStorage.getItem(optionsPreferredRound));
  return data || [];
}

function setOptionsPreferredRound(data) {
  localStorage.setItem(optionsPreferredRound, JSON.stringify(data));
}

export const optionsLocalStorage = {
  getOptionsPreferredRound,
  setOptionsPreferredRound,
};
