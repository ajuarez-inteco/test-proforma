/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DynamicInput from '../../../components/DynamicInput';
import Button from '../../../components/Button';
import { Add, ArrowForward, Save } from '../../../components/Icons';
import InputDate from '../../../components/InputDate';
import useModel from '../../../hooks/useModel';
import { optionsConfig } from '../../../utils/config/options.config';

const data = [
  {
    name: 'Series B',
    pv: [105, 120],
  },
  {
    name: 'Series A',
    pv: [105, 85],
  },
  {
    name: 'Series B',
    pv: [85, 65],
  },
];

const Returns = () => {
  const { investorReturn } = useSelector((state) => state.captable);
  const { models } = useSelector((state) => state.models);
  const { updateModel } = useModel();
  const { modelSelected } = useSelector((state) => state.models);
  const currencies = optionsConfig.models;
  const [table, setTable] = useState({});

  const tableHeaders = [
    { type: 'dividends', name: 'Dividends ('.concat(modelSelected.currency, ')') },
    { type: 'liquidationPreference', name: 'Liquidation Preference ('.concat(modelSelected.currency, ')') },
    { type: 'commonProceeds', name: 'Common Proceeds ('.concat(modelSelected.currency, ')') },
    { type: 'exercisePrice', name: 'Exercise Proceeds ('.concat(modelSelected.currency, ')') },
    { type: 'netProceeds', name: 'Net Proceeds ('.concat(modelSelected.currency, ')') },
    { type: 'proceeds', name: 'Percent Proceeds' },
    { type: 'ownership', name: 'Percent Ownership' },
    { type: 'returnMultiple', name: 'Return Multiple' },
    { type: 'IRR', name: 'IRR' },
  ];

  const onChangeExitDate = (e) => {
    const modelId = models[0].uuid;
    const newVal = { exitDate: e };
    updateModel(modelId, newVal);
  };

  const onChangeInvestmentAmount = (e) => {
    const modelId = models[0].uuid;
    const newVal = { investmentAmount: e };
    updateModel(modelId, newVal);
  };

  useEffect(() => {
    const buildTable = tableHeaders.reduce((acc, curr) => {
      const key = curr.type;
      const curGroup = investorReturn.table.filter((e) => e[key] !== undefined);

      return { ...acc, [key]: curGroup };
    }, {});

    setTable(buildTable);
    // TODO: Add fix to this line
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investorReturn.table]);

  return (
    <div className="grid grid-cols-9 grid-rows-18 gap-x-6 gap-y-2">
      <div className="col-start-8 col-span-2">
        <div className="flex">
          <Button icon={Save}>
            Export
          </Button>
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="text-left mt-8">
          Currency in:
          {' '}
          {currencies.currencys[modelSelected.currency].legend}
        </h2>
      </div>
      <div className="col-span-9 my-6">
        <div className="flex w-full">
          <div className="flex">
            <InputDate
              label="Exit Date"
              updateValue={onChangeExitDate}
            />
          </div>
          <div className="flex mx-3">
            <DynamicInput
              updateValue={onChangeInvestmentAmount}
              placeholder="100,000,000"
              className="border-pfBlack border"
              name="exitValue"
              type="money"
              label="Exit Value"
            />
          </div>
          <div className="flex items-center mx-3">
            <Add fill="#408BDD" />
          </div>
          <div className="flex flex-col mx-3">
            <p className="text-pfBlack text-sm leading-4 mb-3">
              Exercise Proceeds (
              {modelSelected.currency}
              )
            </p>
            <p className="text-xl text-pfBlack">1,000,000</p>
          </div>
          <div className="flex items-center mx-3">
            <ArrowForward fill="#408BDD" />
          </div>
          <div className="flex flex-col ml-3">
            <p className="text-pfBlack text-sm leading-4 mb-3">
              Total Payout Amount (
              {modelSelected.currency}
              )
            </p>
            <p className="text-xl text-pfBlack">101,000,000</p>
          </div>
        </div>
      </div>
      <div className="col-span-9">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart width={730} height={400} data={data}>
            <CartesianGrid horizontal={false} vertical={false} />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis axisLine={false} width={176} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="pv" fill="#8884d8" />
            <ReferenceLine y={80} stroke="#333333" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="col-span-9">
        <table className="w-full">
          <tbody>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left border-t border-grayDark w-44">
                Dividends
              </th>
              {table?.dividends?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.dividends || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                Liquidation Preference
              </th>
              {table?.liquidationPreference?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.liquidationPreference || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                Common Proceeds
              </th>
              {table?.commonProceeds?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.commonProceeds || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                Exercise Proceeds
              </th>
              {table?.exercisePrice?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.exercisePrice || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left border-t border-grayDark w-44">
                Net Proceeds
              </th>
              {table?.netProceeds?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.netProceeds || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                Percent Proceeds
              </th>
              {table?.proceeds?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.proceeds || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                Percent Ownership
              </th>
              {table?.ownership?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.ownership || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                Return Multiple
              </th>
              {table?.returnMultiple?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.returnMultiple || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <th className="text-xs font-semibold text-pfBlack text-left w-44">
                IRR
              </th>
              {table?.IRR?.map((row) => (
                <td className="text-xl text-pfBlack text-right" key={row.uuid}>
                  {row.IRR || '-'}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Returns;
