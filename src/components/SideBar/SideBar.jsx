import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import LinkButton from '../LinkButton';
import Modal from '../Modal';
import Button from '../Button';
import { modelsData } from '../../utils/data';
import { ThreeDots } from '../Icons';
import useModel from '../../hooks/useModel';
import { modelsRoute } from '../../utils/constants';
import { PresetsModal } from '../Modal/PresetsModal';
import useOutsideClick from '../../hooks/useOutsideClick';

const ContainerMenu = ({
  path,
  currentPath,
  icon: Icon,
  bg,
  border,
  name,
  className,
  disabled,
  action,
}) => {
  const active = currentPath === path;

  let menuContainerClass = className;
  menuContainerClass = active
    ? menuContainerClass.replace(
      'bg-transparent border-white',
      `${bg} ${border}`,
    )
    : menuContainerClass;

  if (action) {
    return (
      <Button
        disabled={disabled}
        onClick={action}
        className={menuContainerClass}
      >
        <Icon
          className={`${
            active ? 'fill-pfBlack' : 'fill-pfBlack'
          } group-hover:fill-white`}
        />
        <span className="hidden transition-all text-xs font-normal group-hover:block group-hover:text-white group-hover/sidebar:block">
          {name}
        </span>
      </Button>
    );
  }
  return (
    <LinkButton disabled={disabled} to={path} _className={menuContainerClass}>
      <Icon
        className={`${
          active ? 'fill-white' : 'fill-pfBlack'
        } group-hover:fill-white`}
      />
      <span className="hidden transition-all text-xs font-normal group-hover:block group-hover:text-white group-hover/sidebar:block">
        {name}
      </span>
      {path === modelsRoute && (
        <ThreeDots
          nofill
          classNamePath={`${
            active ? 'fill-white' : 'fill-pfBlack'
          } group-hover:fill-white`}
          className="hidden group-hover:block group-hover/sidebar:block"
        />
      )}
    </LinkButton>
  );
};

ContainerMenu.defaultProps = {
  path: '/',
  currentPath: '',
  disabled: false,
  action: false,
};

ContainerMenu.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  currentPath: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
    .isRequired,
  bg: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  border: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};

const SideBar = () => {
  const { models } = useSelector((state) => state.models);
  const wrapperRef = useRef(null);
  const [showModalPresents, setShowModalPresents] = useOutsideClick(wrapperRef);
  const [menu, setMenu] = useState([]);
  const { validateUuid } = useModel();
  useEffect(() => {
    if (models.length > 0) {
      const uuidModel = validateUuid();
      const model = models.find((item) => item.uuid === uuidModel);
      let i = modelsData.menu.findIndex((md) => md.path === modelsRoute);
      modelsData.menu[i].name = model.name;
      i = modelsData.menu.findIndex((md) => md.path === '/modelpresets');
      modelsData.menu[i].action = () => setShowModalPresents(true);
      setMenu(modelsData.menu);
    }
  }, [models, setShowModalPresents, validateUuid]);

  return (
    <aside className="flex flex-col gap-5 group/sidebar">
      {menu.map((item) => (
        <ContainerMenu key={item.name} {...item} />
      ))}
      {showModalPresents && (
        <Modal
          refProp={wrapperRef}
          closeModal={() => setShowModalPresents(false)}
        >
          <PresetsModal closeModal={() => setShowModalPresents(false)} />
        </Modal>
      )}
    </aside>
  );
};
export default SideBar;
