import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import { Save } from '../../../components/Icons';
import { optionsConfig } from '../../../utils/config/options.config';
import { termsFixedKeys, termsFormatKeys } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/format';

const Terms = () => {
  const { terms } = useSelector((state) => state.captable);
  const { modelSelected } = useSelector((state) => state.models);
  const { models } = optionsConfig;

  const validateKey = (key, value, name = '') => {
    if (termsFormatKeys.includes(key)) return formatCurrency(value);
    if (termsFixedKeys.includes(key) && typeof value === 'number') {
      return key === 'liquidationPreference' ? value.toFixed(2).concat('x') : value.toFixed(2);
    }
    if (key === 'antidilutionPreviousRound') {
      return /fully diluted/gi.test(name) ? value.toFixed(2) : formatCurrency(value);
    }
    return value;
  };

  return (
    <div className="grid grid-cols-9 grid-rows-18 gap-x-6 gap-y-2">
      <div className="border-t border-grayDark hidden" />
      <div className="col-start-8 col-span-2">
        <div className="flex mb-6">
          <Button icon={Save}>
            Export
          </Button>
        </div>
      </div>
      <div className="col-span-3 mb-6">
        <h2 className="text-left mt-8">
          Currency in:
          {' '}
          {models.currencys[modelSelected.currency].legend}
        </h2>
      </div>
      {terms.table.map((term) => (
        <div className="col-span-9 mb-6" key={term.uuid}>
          <div className="flex flex-col">
            <p className="text-2xl font-semibold uppercase font-semibold">{term.name}</p>
            {term.values.map((concept) => (
              <table className="w-full" key={concept.key}>
                <thead>
                  <tr>
                    <th scope="col" className="px-2 py-2.5">
                      <p className="mt-6 text-xl font-bold text-pfBlack text-left">
                        {/valuation/gi.test(concept.name) ? concept.name.concat(' (', modelSelected.currency, ')') : concept.name}
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {concept.values.map(({ key, value, name }) => (
                    <tr
                      key={key}
                      className={`${/total|post-money valuation/gi.test(name) && 'border-t border-grayDark font-bold'}`}
                    >
                      <td
                        className={`
                          px-2 py-1 whitespace-nowrap text-base text-pfBlack
                          ${/total|post-money valuation/gi.test(name) ? 'font-bold' : 'font-medium'}
                        `}
                      >
                        {name}
                      </td>
                      <td
                        className={`
                          text-base text-right text-pfBlack px-2 py-1 whitespace-nowrap
                          ${/total|post-money valuation/gi.test(name) ? 'font-bold' : 'font-medium'}
                        `}
                      >
                        {validateKey(key, value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Terms;
