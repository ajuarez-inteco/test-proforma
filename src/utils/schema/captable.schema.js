import { number, object, string } from 'yup';

const addShareholder = object().shape({
  name: string('Name must be a string')
    .required('Name is a required field'),
  investment: number('Ivenstment must be a number')
    .required('Ivestment is a required field'),
  shares: number('Shares must be a number')
    .required('Shares is a required field'),
});

export const capTableSchema = {
  addShareholder,
};
