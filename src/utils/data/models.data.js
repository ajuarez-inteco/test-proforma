import {
  MenuAppsIcon,
  MenuConfigIcon,
  MenuDollarIcon,
  MenuLayoutIcon,
  MenuMetricsIcon,
  MenuMoneyIcon,
  MenuPointsIcon,
  MenuTunderIcon,
  MenuUserIcon,
  MenuPresetsIcon,
} from '../../components/Icons';

const investmentReturn = {
  exitDate: {
    type: 'date',
    label: 'Exit Date',
    name: 'exitDate',
    tooltip: `Enter the potential date of a sale or investor payout. This is used to calculate an annualized investor return rate`,
    placeholder: '',
  },
  exitValue: {
    type: 'money',
    label: 'Exit Value',
    name: 'exitValue',
    tooltip: `Enter a potential exit value to see the proceeds breakdown for each shareholder category. This represents the sale value of the business minus any debt repayment, deal expenses, or fees.`,
    placeholder: '',
  },
  exitProceeds: {
    type: 'money',
    label: 'Exercise Proceeds',
    name: 'exitValue',
    tooltip: ``,
    placeholder: '',
  },
  totalPayout: {
    type: 'money',
    label: 'Total Payout Amount',
    name: 'exitValue',
    tooltip: ``,
    placeholder: '',
  },
};

const modelsPreset = {
  currency: {
    type: 'options',
    label: 'Currency',
    name: 'currency',
    tooltip: ``,
    placeholder: '',
  },
  modelStarYear: {
    type: 'options',
    label: 'Model Start Year',
    name: 'modelStarYear',
    tooltip: ``,
    placeholder: '',
  },
  openingCashBalance: {
    type: 'money',
    label: 'Opening Cash Balance',
    name: 'openingCashBalance',
    tooltip: ``,
    placeholder: '',
  },
  daysAccountPayable: {
    type: 'number',
    label: 'Days Accounts Payable',
    name: 'daysAccountPayable',
    tooltip: ``,
    placeholder: '',
  },
  daysInvetoryOnHand: {
    type: 'number',
    label: 'Days Inventory on Hand',
    name: 'daysInvetoryOnHand',
    tooltip: ``,
    placeholder: '',
  },
  badDebitExpensePercentageRevenue: {
    type: 'percentage',
    label: 'Bad Debt Expense % of Revenue',
    name: 'badDebitExpensePercentageRevenue',
    tooltip: ``,
    placeholder: '',
  },
  incomeTax: {
    type: 'percentage',
    label: 'Income Tax',
    name: 'incomeTax',
    tooltip: ``,
    placeholder: '',
  },
  customerLifetimeValueDiscountRatePercentage: {
    type: 'percentage',
    label: 'Customer Lifetime Value Discount Rate',
    name: 'customerLifetimeValueDiscountRatePercentage',
    tooltip: ``,
    placeholder: '',
  },
};

const menu = [{
  name: '',
  icon: MenuAppsIcon,
  path: '/models',
  bg: 'bg-blueDark',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-blueDark hover:border-blue',
  disabled: false,
  border: 'border-blue',
},
{
  name: 'Revenue',
  icon: MenuDollarIcon,
  path: '/revenue',
  bg: 'bg-greenLight',
  disabled: false,
  border: 'border-green',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-greenLight hover:border-green',
},
{
  name: 'Expenses',
  icon: MenuPointsIcon,
  path: '/expenses',
  bg: 'bg-orange',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-orange hover:border-orangeDark',
  disabled: true,
  border: 'border-orangeDark',
},
{
  name: 'Employees',
  icon: MenuUserIcon,
  path: '/employees',
  bg: 'bg-blueLight',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-blueLight hover:border-blueDark',
  disabled: true,
  border: 'border-blueDark',
},
{
  name: 'Assets',
  icon: MenuMoneyIcon,
  path: '/assets',
  bg: 'bg-yellowLigth',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-yellowLigth hover:border-yellowDark',
  disabled: true,
  border: 'border-yellowDark',
},
{
  name: 'Cap Table',
  icon: MenuLayoutIcon,
  path: '/captable',
  bg: 'bg-orangeDark',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-orangeDark hover:border-red',
  disabled: false,
  border: 'border-red',
},
{
  name: 'Outputs',
  icon: MenuTunderIcon,
  path: '/outputs',
  bg: 'bg-blue',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-blue hover:border-blueDark',
  disabled: true,
  border: 'border-blueDark',
},
{
  name: 'Model Presets',
  icon: MenuPresetsIcon,
  path: '/modelpresets',
  bg: 'bg-grayDark',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-grayDark hover:border-pfBlack',
  disabled: false,
  border: 'border-pfBlack',
},
{
  name: 'Resources',
  icon: MenuMetricsIcon,
  path: '/resources',
  bg: 'bg-greenDark',
  className:
    'group group-hover/sidebar:text-pfBlack mt-16 transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-greenDark hover:border-green',
  disabled: true,
  border: 'border-green',
},
{
  name: 'Settings',
  icon: MenuConfigIcon,
  path: '/settings',
  bg: 'bg-pfBlack',
  className:
    'group group-hover/sidebar:text-pfBlack transition-all gap-5 w-36 h-10 flex justify-end group-hover/sidebar:justify-start px-2 py-2 pr-8 hover:pr-4 border-r-8 bg-transparent border-white items-center bg hover:bg-pfBlack hover:border-grayDark',
  disabled: true,
  border: 'border-grayDark',
}];

export const modelsData = {
  investmentReturn,
  modelsPreset,
  menu,
};
