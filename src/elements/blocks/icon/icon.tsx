import React from 'react';
import {IconType} from 'react-icons';

//------------------------------------------------------------------------------

const Icon: React.FC<IconProps> = (props) => {
  const {
    prefix: Prefix,
    className,
    onClick,
  } = props;

  return (
    <Prefix className={className} aria-hidden onClick={onClick} />
  );
};

//------------------------------------------------------------------------------

interface IconProps {
  prefix: IconType,
  className?: string,
  onClick?: () => void,
};

//------------------------------------------------------------------------------

export default Icon;
