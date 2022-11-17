import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import { People } from '../Icons';
import useSubmit from '../../hooks/submit';
import LabelInput from '../Control';
import Toast from '../ToastComponent';
import { capTableSchema } from '../../utils/schema';
import useShareholder from '../../hooks/useShareholder';

const ShareholderModal = ({
  onClose,
  editMode,
  values,
}) => {
  const { updateShareholder, createShareholder } = useShareholder();
  const action = editMode
    ? updateShareholder
    : createShareholder;
  const schema = capTableSchema.addShareholder;
  const fields = editMode
    ? ['name', 'investment', 'shares', 'uuid']
    : ['name', 'investment', 'shares'];
  const {
    errors,
    response,
    dirtyFields,
    alertText,
    setAlertText,
    registerFields,
    onSubmit,
  } = useSubmit({
    schema,
    action,
    fields,
  });

  useEffect(() => {
    if (response) onClose();
  }, [response, onClose]);

  return (
    <div className="flex flex-col justify-center items-center max-w-568 gap-8">
      {alertText && (
        <Toast
          text={alertText}
          type="alert"
          timeOn
          closeAction={() => setAlertText('')}
        />
      )}
      <div className="flex">
        <People fill="#004AB5" />
        <h2 className="ml-2 text-xl text-pfBlack">
          {editMode ? 'Edit Shareholder' : 'Add Shareholder'}
        </h2>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-2">
          <form onSubmit={onSubmit}>
            {fields.map((field) => (
              <div
                className={`
                  w-full mt-8
                  ${field === 'uuid' && 'hidden'}
                `}
                key={field}
              >
                <LabelInput
                  name={field}
                  type={/password/gi.test(field) ? 'password' : 'text'}
                  register={registerFields[field]}
                  noOk={!!errors[field]}
                  defaultValue={editMode && values !== null ? values[field] : null}
                  ok={!errors[field] && dirtyFields[field]}
                >
                  {field.replace(/([A-Z]+)/g, ' $1')}
                </LabelInput>
                <p className="text-red font-normal text-xs">
                  <span className="flex mx-auto max-w-368">
                    {errors[field]?.message}
                  </span>
                </p>
              </div>
            ))}
            <div className="flex flex-col items-center mt-8">
              <div className="flex">
                <Button submit>
                  {editMode ? 'Update Shareholder' : 'Add Shareholder'}
                </Button>
              </div>
              <div className="flex mt-8">
                <Button onClick={onClose} type="button">
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ShareholderModal.defaultProps = {
  onClose: () => {},
  editMode: false,
  values: null,
};

ShareholderModal.propTypes = {
  onClose: PropTypes.func,
  editMode: PropTypes.bool,
  values: PropTypes.shape({
    modelId: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    investment: PropTypes.number.isRequired,
    shares: PropTypes.number.isRequired,
  }),
};

export default ShareholderModal;
