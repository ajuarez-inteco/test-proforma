import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useOutsideClick from '../hooks/useOutsideClick';

const IconDropdown = ({
  children,
  options,
  variant,
  onClickItem,
}) => {
  const wrapperRef = useRef(null);
  const [showOptions, setShowOptions] = useOutsideClick(wrapperRef);
  const styles = {
    default: '',
    outline: '',
    floating: 'inline-block rounded-full bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9',
  };
  const VARIANT = styles[variant];

  return (
    <div className="flex justify-end">
      <div>
        <div className="dropdown relative">
          <button
            onClick={() => setShowOptions((state) => !state)}
            className={VARIANT}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {children}
          </button>
          {showOptions && (
            <ul
              ref={wrapperRef}
              className={`
                dropdown-menu
                min-w-max
                absolute
                bg-white
                text-base
                z-50
                float-left
                py-2
                list-none
                text-left
                shadow-lg
                mt-1
                m-0
                bg-clip-padding
                border-none
              `}
              aria-labelledby="dropdownMenuButton1"
            >
              {options.map((option, i) => (
                <li key={option}>
                  <button
                    onClick={() => {
                      onClickItem(i);
                      setShowOptions(false);
                    }}
                    className="
                      dropdown-item
                      text-xs
                      py-4
                      px-8
                      font-normal
                      block
                      w-full
                      whitespace-nowrap
                      bg-transparent
                      text-blueDark
                      hover:bg-zinc
                    "
                    type="button"
                  >
                    {option}
                  </button>
                  {i !== options.length - 1 && <hr className="w-3/4 mx-auto h-0 my-2 border border-solid border-t-0 opacity-25" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

IconDropdown.defaultProps = {
  variant: 'default',
  onClickItem: () => {},
};

IconDropdown.propTypes = {
  variant: PropTypes.oneOf(['default', 'outline', 'floating']),
  onClickItem: PropTypes.func,
  children: PropTypes.node.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default IconDropdown;
