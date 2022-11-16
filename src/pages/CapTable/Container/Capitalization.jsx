import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from 'recharts';
import Button from '../../../components/Button';
import { Caret, CaretDown, Save } from '../../../components/Icons';
import { objectColors } from '../../../utils/constants';
import { optionsConfig } from '../../../utils/config/options.config';
import { formatCurrency } from '../../../utils/format';

// TODO: Finish animated tooltip
// eslint-disable-next-line no-unused-vars
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const Capitalization = () => {
  const { capitalization } = useSelector((state) => state.captable);
  const { modelSelected } = useSelector((state) => state.models);
  const { models } = optionsConfig;
  const [activeIndex, setActiveIndex] = useState(0);
  const [rowSelected, setRowSelected] = useState(null);
  const titles = [
    'Round Name',
    'Investment Amount ('.concat(modelSelected.currency, ')'),
    'Shares',
    'Ownership before Options',
    'Fully Diluted Ownership',
  ];

  return (
    <div className="grid grid-cols-9 grid-rows-18 gap-x-6 gap-y-2">
      <div
        className="
          hidden
          hover:bg-blueLight-fade
          hover:bg-blue-fade
          hover:bg-blueDark-fade
          hover:bg-red-fade
          hover:bg-greenLight-fade
          hover:bg-green-fade
          hover:bg-greenDark-fade
          hover:bg-orange-fade
          hover:bg-orangeDark-fade
          hover:bg-yellowLigth-fade
          hover:bg-yellow-fade
          hover:bg-yellowDark-fade
          hover:bg-purple-fade
          hover:bg-purpleDark-fade
          bg-black
          bg-pfBlack
          bg-gray
          bg-grayDark
          bg-white
          bg-blueLight
          bg-blue
          bg-blueDark
          bg-red
          bg-greenLight
          bg-green
          bg-greenDark
          bg-orange
          bg-orangeDark
          bg-yellowLigth
          bg-yellow
          bg-yellowDark
          bg-purple
          bg-purpleDark
          bg-zinc
        "
      />
      <div className="col-start-8 col-span-2">
        <div className="flex justify-end">
          <Button icon={Save}>
            Export
          </Button>
        </div>
      </div>
      <div className="col-span-3">
        <h2 className="text-left mt-8">
          Currency in:
          {' '}
          {models.currencys[modelSelected.currency].legend}
        </h2>
      </div>
      <div className="col-span-9">
        <table className="w-full">
          <thead>
            <tr>
              {titles.map((title, i) => (
                <th
                  scope="col"
                  key={title}
                >
                  <p className={`
                    text-xs text-pfBlack font-semibold py-4
                    after:content-['']
                    after:flex
                    after:ml-1;
                    after:h-0.5
                    after:w-10
                    after:mt-2.5
                    after:bg-blueDark
                    ${i === 0
                    ? 'text-left'
                    : 'text-right after:ml-auto'
                      }
                    `}
                  >
                    {title}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {capitalization.table.map((row, rowIdx) => (
              <React.Fragment key={row.uuid}>
                <tr
                  key={row.uuid}
                  onMouseEnter={() => setActiveIndex(rowIdx)}
                  className={`hover:bg-${row.color}-fade`}
                >
                  <td className="relative">
                    <span
                      className={`
                        bg-${row.color}
                        mr-5
                        rounded-full
                        w-3
                        h-3
                        absolute
                        left-0
                        top-middle-circle
                        inset-y-auto
                      `}
                    />
                    <p className="text-left text-xl ml-5">
                      {row.name}
                    </p>
                  </td>
                  <td className="text-right text-xl">
                    {formatCurrency(row.investment, modelSelected.currency)}
                  </td>
                  <td className="text-right text-xl">
                    {formatCurrency(row.shares, modelSelected.currency)}
                  </td>
                  <td className="text-right text-xl">
                    {row.ownership && row.ownership.toFixed(2)}
                  </td>
                  <td className="text-right text-xl">
                    {row.ownershipDiluted ? row.ownershipDiluted.toFixed(2) : ''}
                  </td>
                  {row.series?.length > 0 && (
                    <td className="text-right text-xl">
                      {rowSelected === rowIdx
                        ? (
                          <button
                            type="button"
                            onClick={() => {
                              setRowSelected(null);
                            }}
                          >
                            <Caret width={10} height={10} fill="#333333" />
                          </button>
                        )
                        : (
                          <button
                            type="button"
                            onClick={() => {
                              setRowSelected(rowIdx);
                            }}
                          >
                            <CaretDown width={10} height={10} fill="#333333" />
                          </button>
                        )}
                    </td>
                  )}
                </tr>
                {capitalization.table[rowIdx].series?.length
                && capitalization.table[rowIdx].series.map((serieRow) => (
                  <tr
                    key={serieRow.uuid + Object.keys(serieRow).toString()}
                    onMouseEnter={() => setActiveIndex(rowIdx)}
                    className={`
                      ${rowSelected === rowIdx ? '' : 'hidden'}
                    `}
                  >
                    <td className="relative text-left text-xl pl-5">
                      {serieRow.name}
                    </td>
                    <td className="text-right text-xl">
                      {formatCurrency(serieRow.investment, modelSelected.currency)}
                    </td>
                    <td className="text-right text-xl">
                      {formatCurrency(serieRow.shares, modelSelected.currency)}
                    </td>
                    <td className="text-right text-xl">
                      {serieRow.ownership && serieRow.ownership.toFixed(2)}
                    </td>
                    <td className="text-right text-xl">
                      {serieRow.ownershipDiluted && serieRow.ownershipDiluted.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr>
              <td className="text-xl pl-5">
                Total
              </td>
              <td className="text-xl text-right">
                {formatCurrency(capitalization.totals.investment, modelSelected.currency)}
              </td>
              <td className="text-xl text-right">
                {formatCurrency(capitalization.totals.shares, modelSelected.currency)}
              </td>
              <td className="text-xl text-right">
                { capitalization.totals.ownership && capitalization.totals.ownership.toFixed(2)}
              </td>
              <td className="text-xl text-right">
                {capitalization.totals.ownershipDiluted
                && capitalization.totals.ownershipDiluted.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <hr className="w-full my-10 mx-0 px-0 text-grayDark" />
      </div>
      <div className="col-span-9">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={730} height={400}>
            <Pie
              activeIndex={activeIndex}
              // activeShape={renderActiveShape}
              data={capitalization.table}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={130}
              dataKey="shares"
              onMouseEnter={(_, i) => setActiveIndex(i)}
            >
              {capitalization.table.map((entry) => (
                <Cell key={entry.name} fill={objectColors[entry.color]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Capitalization;
